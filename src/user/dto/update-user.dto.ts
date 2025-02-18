import { IsEmail } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';
import { File } from 'src/file/entities/file.entity';

export class UpdateUserDto {
  id: number;
  
  username?: string;

  @IsEmail()
  email?: string;

  profilePicture?: File;

  blogs?: Blog[];
}