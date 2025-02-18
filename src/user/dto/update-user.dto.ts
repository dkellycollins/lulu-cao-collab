import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  id: number;
  
  username?: string;

  @IsEmail()
  email?: string;

  profilePicture?: string;
}