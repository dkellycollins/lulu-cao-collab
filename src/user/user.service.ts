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

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, email, profilePictureId } = createUserDto;
      const user = this.userRepository.create({username: username, email: email});
      await this.userRepository.save(user);

      if (profilePictureId) {
        user.profilePicture = await this.fileService.findOne(profilePictureId);
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['blogs', 'profilePictures'] });

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
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    if (user.profilePicture) {
      await this.fileService.delete(user.profilePicture.id);
    }
    await this.userRepository.delete(id);
  }
}
