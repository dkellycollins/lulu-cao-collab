import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiFoundResponse, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogResponseDto } from './dto/blog-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiBearerAuth()
@ApiTags('blogs') // Naming a nesting route called `/blogs`
@Controller() 
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /**
   * Get a blog post by id
   */
  @Get('blogs/:id')
  @ApiFoundResponse({ description: 'Blog found', type: BlogResponseDto })
  @ApiNotFoundResponse({ description: 'Blog not found' })
  async findOne(@Param('id') id: number): Promise<BlogResponseDto> {
    const blog = await this.blogService.findOne(id);
    return plainToInstance(BlogResponseDto, blog)
  }

  /**
   * Get all blog posts
   */
  @Get('blogs')
  @ApiFoundResponse({ description: 'Blogs found', type: [BlogResponseDto] })
  @ApiNotFoundResponse({ description: 'No blog found' })
  async findAll(): Promise<BlogResponseDto[]> {
    const blogs = await this.blogService.findAll();
    return blogs.map(blog => plainToInstance(BlogResponseDto, blog));
  }

  /**
   * Create a new blog post
   */
  @Post('blogs')
  @ApiCreatedResponse({ description: 'Blog created', type: BlogResponseDto })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create(@Body() createBlogDto: CreateBlogDto): Promise<BlogResponseDto> {
    const blog = this.blogService.create(
      createBlogDto.title, 
      createBlogDto.content,
      createBlogDto.userId,
    );

    return plainToInstance(BlogResponseDto, blog);
  }

  /**
   * Update a blog post by id
   */
  @Put('blogs/:id')
  @ApiOkResponse({ description: 'Blog updated', type: BlogResponseDto })
  @ApiNotFoundResponse({ description: 'Blog not found' })
  async update(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<BlogResponseDto> {
    const updatedBlog = this.blogService.update(
      id,
      updateBlogDto.title, 
      updateBlogDto.content,
    );

    return plainToInstance(BlogResponseDto, updatedBlog)
  }

  /**
   * Delete a blog post by id
   */
  @Delete('blogs/:id')
  @ApiOkResponse({ description: 'Blog deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: number): Promise<void> {
    return this.blogService.delete(id);
  }
}
