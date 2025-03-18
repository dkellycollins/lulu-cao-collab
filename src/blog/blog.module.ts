import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]), // Ensure Blog repository is provided
    FileModule // Import FileModule to get FileRepository
  ], 
  controllers: [BlogController],
  providers: [BlogService],
  exports: [TypeOrmModule.forFeature([Blog])], // Export so other modules can use it
})
export class BlogModule {}
