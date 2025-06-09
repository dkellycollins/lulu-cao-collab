import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsString()
  providerKey: string;

  @IsString()
  filename: string;

  @IsString()
  contentType: string;

  @IsNumber()
  contentSize: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  blogId?: number;
}
