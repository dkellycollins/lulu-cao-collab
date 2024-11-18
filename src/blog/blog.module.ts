import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blog.service';
import { BlogsController } from './blog.controller';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])], // Register the Blog repository for the Blog entity
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
