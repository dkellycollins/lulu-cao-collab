import { Controller, Get, Delete, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Blog } from 'src/blog/entities/blog.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Get featured blogs
   * @returns 
   */
  @Get()
  @ApiOkResponse({ type: [Blog] })
  getFeaturedBlogs(): string {
    return this.appService.getFeaturedBlogs();
  }

  // @Post()
  // login(): Promise<void> {
  //   return
  // }

  // @Delete()
  // logout(): Promise<void> {
  //   return
  // }
}
