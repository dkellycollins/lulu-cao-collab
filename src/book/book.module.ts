import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // Register the Book repository for the Book entity
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
