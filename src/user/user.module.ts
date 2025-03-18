import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { BlogModule } from 'src/blog/blog.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BlogModule,
    FileModule
  ], // Register the User repository for the User entity
  providers: [UserService],
  controllers: [UserController],
})

export class UserModule {}
