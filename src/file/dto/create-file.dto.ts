import { IsString, IsNumber } from 'class-validator';

export class CreateFileDto {
  @IsString()
  providerKey: string;

  @IsString()
  filename: string;

  @IsString()
  contentType: string;

  @IsNumber()
  contentSize: number;
}
