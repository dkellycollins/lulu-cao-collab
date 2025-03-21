import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "./file.controller";
import { File } from './entities/file.entity';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService],
  controllers: [FileController],
  exports: [TypeOrmModule.forFeature([File])]
})

export class FileModule {}