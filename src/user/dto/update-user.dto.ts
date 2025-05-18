import { IsEmail } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';

export class UpdateUserDto {
  id: number;
  
  username?: string;

  @IsEmail()
  email?: string;

  blogs?: Blog[];
}