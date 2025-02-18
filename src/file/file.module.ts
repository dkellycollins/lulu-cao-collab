import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileController } from "./file.controller";
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController]
})

export class FileModule {}