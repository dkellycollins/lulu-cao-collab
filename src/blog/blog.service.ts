import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  private readonly blogs: Blog[] = [];

  create(blog: CreateBlogDto): Blog {
    this.blogs.push(blog);
    return blog;
  }

  findOne(id: number): Blog {
    return this.blogs[id];
  }
}
