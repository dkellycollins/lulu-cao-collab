import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) // Inject the BlogRepository
    private blogRepository: Repository<Blog>,
  ) {}

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOne({where: {id}, relations: ['author', 'images']});
  }

  async create(title: string, content: string, ): Promise<Blog> {
    const blog = this.blogRepository.create({ title, content });
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
