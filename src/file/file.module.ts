import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "./file.controller";
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [    
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    TypeOrmModule.forFeature([File])
  ],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService]
})

export class FileModule {}