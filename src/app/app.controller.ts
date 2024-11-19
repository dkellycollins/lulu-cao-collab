import { Controller, Get, Delete, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get featured blogs' })
  @Get()
  getFeaturedBlogs(): string {
    return this.appService.getFeaturedBlogs();
  }

  @ApiOperation({ summary: 'Sign up or log in'})
  @Post()
  login(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Log out' })
  @Delete()
  logout(): Promise<void> {
    return
  }
}
