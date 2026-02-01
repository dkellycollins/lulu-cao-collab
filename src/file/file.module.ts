import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "./file.controller";
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { File } from './entities/file.entity';
import { Blog } from '../blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [    
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    TypeOrmModule.forFeature([File, Blog, User])
  ],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService]
})

export class FileModule {}