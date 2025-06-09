import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) // Inject the BlogRepository
    private blogRepository: Repository<Blog>,
    private readonly userService: UserService
  ) {}

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id }, relations: ['images'] });
  
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  
    return blog;
  }

  async findAll(): Promise<Blog[]> {
    const blogs = this.blogRepository.find();

    if (!blogs) {
      throw new NotFoundException(`No blogs available`);
    }

    return blogs;
  }
  
  async create(title: string, content: string, userId: number): Promise<Blog> {
    const blog = this.blogRepository.create({ title, content });
    blog.author = await this.userService.findOneById(userId)
    return this.blogRepository.save(blog);
  }

  async update(id: number, title?: string, content?: string): Promise<Blog> {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);

    if (title) blog.title = title;
    if (content) blog.content = content;

    return this.blogRepository.save(blog);
  }

  async delete(id: number): Promise<void> {
    const result = await this.blogRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Blog with ID ${id} not found`);
  }
}
