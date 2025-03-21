import { IsEmail } from 'class-validator';
import { File } from 'src/file/entities/file.entity';

export class CreateUserDto {
  username: string;

  @IsEmail()
  email: string;

  profilePictures?: File[];
}