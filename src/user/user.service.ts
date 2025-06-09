import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name); 
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    const user = this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = this.userRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<User> {
    try {
      const { username, email } = createUserDto;
      const user = this.userRepository.create({username: username, email: email});
      await this.userRepository.save(user);

      if (file) {
        user.profilePicture = await this.fileService.create(file, user.id);
      }

      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating the new user`, error.stack);
      throw new InternalServerErrorException({
        statusCode: 400,
        message: `Failed to create the user`,
        error: error.message,
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['blogs', 'profilePictures'] });

      if (!user) {
        throw new NotFoundException({
          statusCode: 404,
          message: `User with ID ${id} not found`,
        });
      }

      const { username, email } = updateUserDto;
      if (username) user.username = username;
      if (email) user.email = email;
      
      if (file) {
        user.profilePicture = await this.fileService.create(file, id);
      }

      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(`Error updating user with ID: ${id}`, error.stack);
      throw new InternalServerErrorException({
        statusCode: 400,
        message: `Failed to update user with ID ${id}`,
        error: error.message,
      });
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with ID ${id} not found`);
  }
}
