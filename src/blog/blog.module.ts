import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]), // Ensure Blog repository is provided
    FileModule, // Import FileModule to get FileRepository
    UserModule // Import UserModule to get UserService
  ], 
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
