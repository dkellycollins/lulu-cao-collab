import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BlogsService } from './blog.service';
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiBearerAuth()
@ApiTags('blogs') // Naming a nesting route called `/blogs`
@Controller('blogs') 
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  /**
   * Get all blog posts
   */
  @Get()
  @ApiOkResponse({ description: 'Blogs found', type: [Blog] })
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  /**
   * Get a blog post by id
   */
  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Blog found', type: Blog })
  findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(+id);
  }

  /**
   * Create a new blog post
   */
  @Post()
  @ApiCreatedResponse({ description: 'Blog created', type: Blog })
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.create(createBlogDto.title, createBlogDto.content);
  }

  /**
   * Update a blog post by id
   * @param id 
   * @returns  
   */
  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Blog updated', type: Blog })
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogsService.update(+id, updateBlogDto.title, updateBlogDto.content);
  }

  /**
   * Delete a blog post by id
   * @param id 
   * @returns 
   */
  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Blog deleted' })
  delete(@Param('id') id: string): Promise<void> {
    return this.blogsService.delete(+id);
  }
}
