import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BlogsService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { Blog } from './entities/blog.entity'

@ApiBearerAuth()
@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create blog' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.create(createBlogDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Blog,
  })
  findOne(@Param('id') id: string): Blog {
    return this.blogsService.findOne(+id);
  }
}
