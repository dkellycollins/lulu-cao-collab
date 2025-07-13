import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogResponseDto } from 'src/blog/dto/blog-response.dto';
import { FileResponseDto } from 'src/file/dto/file-response.dto';

export class UserResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  profilePicture?: FileResponseDto; 

  @IsOptional()
  blogs?: BlogResponseDto;
}
