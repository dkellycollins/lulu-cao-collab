import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService } from '../file/file.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async findOneById(id: number): Promise<User> {
    // Check the cache first (redis-replica).
    const cached = await this.redisService.read.get(`user:${id}`);
    if (cached && typeof cached == 'string') {
      console.log(`Existing cache found from redis-replica:`)
      console.log(JSON.parse(cached))
      return JSON.parse(cached);
    }

    // Cache miss: fall back to Postgres. TypeORM routes this SELECT to postgres-replica.
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Populate the cache via redis-primary (the only writable Redis instance).
    await this.redisService.write.set(`user:${id}`, JSON.stringify(user));
    const newCache = await this.redisService.read.get(`user:${id}`);
    if (newCache && typeof newCache == 'string') {
      console.log(`Successfully cached writes to redis-primary:`)
      console.log(JSON.parse(newCache))
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    // TypeORM routes this SELECT to postgres-replica.
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, email, profilePictureId } = createUserDto;
      const user = this.userRepository.create({ username, email });

      if (profilePictureId) {
        user.profilePicture = await this.fileService.findOne(profilePictureId);
      }

      // Single write to postgres-primary, with the profile picture already attached.
      const savedUser = await this.userRepository.save(user);

      // Populate the cache via redis-primary.
      await this.redisService.write.set(
        `user:${savedUser.id}`,
        JSON.stringify(savedUser),
      );

      return savedUser;
    } catch (error: any) {
      this.logger.error(`Error creating the new user`, error.stack);
      throw new InternalServerErrorException({
        statusCode: 400,
        message: `Failed to create the user`,
        error: error.message,
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['blogs', 'profilePicture'] });

      if (!user) {
        throw new NotFoundException({
          statusCode: 404,
          message: `User with ID ${id} not found`,
        });
      }

      const { username, email, profilePictureId } = updateUserDto;
      if (username) user.username = username;
      if (email) user.email = email;

      if (profilePictureId) {
        user.profilePicture = await this.fileService.findOne(profilePictureId);
      }

      // Persist to postgres-primary.
      const savedUser = await this.userRepository.save(user);

      // Refresh the cache via redis-primary.
      await this.redisService.write.set(
        `user:${id}`,
        JSON.stringify(savedUser),
      );

      return savedUser;
    } catch (error: any) {
      this.logger.error(`Error updating user with ID: ${id}`, error.stack);
      throw new InternalServerErrorException({
        statusCode: 400,
        message: `Failed to update user with ID ${id}`,
        error: error.message,
      });
    }
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await this.userRepository.delete(id);
    await this.redisService.write.del(`user:${id}`);

    if (user.profilePicture) {
      await this.fileService.delete(user.profilePicture.id);
    }
  }
}