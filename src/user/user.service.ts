import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { File } from 'src/file/entities/file.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    const {username, email, profilePictures} = createUserDto;
    user.username = username;
    user.email = email;
    if (profilePictures) {
      user.profilePictures = [];

      for (const fileDto of profilePictures) {
        const file = new File();
        file.providerKey = fileDto.providerKey;
        file.filename = fileDto.filename;
        file.contentType = fileDto.contentType;
        file.contentSize = fileDto.contentSize;
        file.user = user;
        await this.fileRepository.save(file);
        user.profilePictures.push(file);
      }
    }
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['blogs'] });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    const {username, email, blogs, profilePictures} = updateUserDto;
    if (username) user.username = username;
    if (email) user.email = email;
    if (blogs) {
      user.blogs = [];

      for (const blogDto of blogs) {
        const blog = new Blog();
        blog.title = blogDto.title;
        blog.content = blogDto.content;
        blog.author = user;
        await this.blogRepository.save(blog);
        user.blogs.push(blog);
      }
    }
    if (profilePictures) {
      user.profilePictures = [];

      for (const fileDto of profilePictures) {
        const file = new File();
        file.providerKey = fileDto.providerKey;
        file.filename = fileDto.filename;
        file.contentType = fileDto.contentType;
        file.contentSize = fileDto.contentSize;
        file.user = user;
        await this.fileRepository.save(file);
        user.profilePictures.push(file);
      }
    }
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with ID ${id} not found`);
  }
}
