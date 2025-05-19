import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FileModule
  ], // Register the User repository for the User entity
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})

export class UserModule {}
