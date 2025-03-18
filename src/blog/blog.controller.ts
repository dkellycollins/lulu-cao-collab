import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiOkResponse, ApiCreatedResponse, ApiFoundResponse, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiBearerAuth()
@ApiTags('blogs') // Naming a nesting route called `/blogs`
@Controller('blogs') 
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /**
   * Get all blog posts
   */
  @Get()
  @ApiFoundResponse({ description: 'Blogs found', type: [Blog] })
  @ApiNotFoundResponse({ description: 'No blog found' })
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  /**
   * Get a blog post by id
   */
  @Get(':id')
  @ApiFoundResponse({ description: 'Blog found' })
  @ApiNotFoundResponse({ description: 'Blog not found' })
  findOne(@Param('id') id: number): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  /**
   * Create a new blog post
   */
  @Post()
  @ApiCreatedResponse({ description: 'Blog created', type: Blog })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(
      createBlogDto.title, 
      createBlogDto.content
    );
  }

  /**
   * Update a blog post by id
   */
  @Put(':id')
  @ApiOkResponse({ description: 'Blog updated', type: Blog })
  @ApiNotFoundResponse({ description: 'Blog not found' })
  update(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.update(
      id,
      updateBlogDto.title, 
      updateBlogDto.content,
    );
  }

  /**
   * Delete a blog post by id
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'Blog deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: number): Promise<void> {
    return this.blogService.delete(id);
  }
}
