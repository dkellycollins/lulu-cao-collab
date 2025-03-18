import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Blog } from '../blog/entities/blog.entity';
import { File } from '../file/entities/file.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name); 
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const {username, email, profilePictures} = createUserDto;
      const user = this.userRepository.create({username: username, email: email});
      await this.userRepository.save(user);
      if (profilePictures) {
        user.profilePictures = [];

        for (const fileDto of profilePictures) {
          const file = new File();
          file.providerKey = fileDto.providerKey;
          file.filename = fileDto.filename;
          file.contentType = fileDto.contentType;
          file.contentSize = fileDto.contentSize;
          await this.fileRepository.save(file);
          user.profilePictures.push(file);
        }
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

      const { username, email, blogs, profilePictures } = updateUserDto;
      if (username) user.username = username;
      if (email) user.email = email;
      if (blogs) {
        user.blogs = user.blogs || [];

        for (const blogDto of blogs) {
          let blog = new Blog();
          let existingBlog: Blog | null = null;
      
          if (blogDto.id) {
            existingBlog = await this.blogRepository.findOneBy({ id: blogDto.id });
          }
      
          if (existingBlog) {
            blog = existingBlog;
          }
      
          blog.title = blogDto.title;
          blog.content = blogDto.content;
          await this.blogRepository.save(blog);
          user.blogs.push(blog);
        }
      }
      
      if (profilePictures) {
        user.profilePictures = user.profilePictures || [];
      
        for (const fileDto of profilePictures) {
          let file = new File();
          let existingFile: File | null = null;
      
          if (fileDto.id) {
            existingFile = await this.fileRepository.findOneBy({ id: fileDto.id });
          }
      
          if (existingFile) {
            file = existingFile;
          }
      
          file.providerKey = fileDto.providerKey;
          file.filename = fileDto.filename;
          file.contentType = fileDto.contentType;
          file.contentSize = fileDto.contentSize;
      
          await this.fileRepository.save(file);
          user.profilePictures.push(file);
        }
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
