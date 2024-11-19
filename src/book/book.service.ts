import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getAllBooks(): string {
    return "VibeReads - A list of books coming soon..."
  }

  getBook(id: string): string {
    return `Book ${id}`
  }
}
