import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { UserService } from '../user/user.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FileService } from '../file/file.service';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) // Inject the BlogRepository
    private blogRepository: Repository<Blog>,
    private readonly userService: UserService,
    private readonly fileService: FileService
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
  
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, content, coverImageId, userId } = createBlogDto;
    const blog = this.blogRepository.create({ title, content });
    blog.author = await this.userService.findOneById(userId)
    if ( coverImageId ) {
      blog.coverImage = await this.fileService.findOne(coverImageId);
    }
    return this.blogRepository.save(blog);
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const { title, content, coverImageId } = updateBlogDto;
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (coverImageId) blog.coverImage = await this.fileService.findOne(coverImageId);

    return this.blogRepository.save(blog);
  }

  async delete(id: number): Promise<void> {
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    await this.blogRepository.delete(id);

    if (blog.coverImage) {
      await this.fileService.delete(blog.coverImage.id);
    }
  }
}
