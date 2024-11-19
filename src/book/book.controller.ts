import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BookService } from './book.service'

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  getAllBooks(): string {
    return this.bookService.getAllBooks();
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @Get(':id')
  getBook(@Param('id') id: string): string {
    return this.bookService.getBook(id)
  }

  @ApiOperation({ summary: 'Create a new book' })
  @Post()
  create(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @Put(':id')
  update(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @Delete(':id')
  delete(): Promise<void> {
    return
  }
}
