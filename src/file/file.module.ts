import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "./file.controller";
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [    
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
    TypeOrmModule.forFeature([File])
  ],
  providers: [FileService],
  controllers: [FileController],
  exports: [TypeOrmModule.forFeature([File]), FileService]
})

export class FileModule {}