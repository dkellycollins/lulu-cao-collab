import { IsInt, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly author: string;

  @IsString()
  readonly content: string;
}
