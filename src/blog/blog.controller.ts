import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BlogsService } from './blog.service';
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiBearerAuth()
@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({ summary: "@ApiOperation({ summary: 'Get all blog posts' })" })
  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the blog post, written with @ApiParam()' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a new blog post using createBlogDto' })
  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.create(createBlogDto.title, createBlogDto.content);
  }

  @ApiOperation({ summary: 'Update a blog post by ID using UpdateBlogDto' })
  @ApiParam({ name: 'id', description: 'The ID of the blog post' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogsService.update(+id, updateBlogDto.title, updateBlogDto.content);
  }

  @ApiOperation({ summary: 'Delete a blog post by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the blog post' })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.blogsService.delete(+id);
  }
}
