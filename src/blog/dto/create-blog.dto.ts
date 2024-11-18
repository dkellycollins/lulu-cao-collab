import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ description: 'Title of the blog'})
  readonly title: string;

  @ApiProperty({ description: 'Author of the blog' })
  readonly author: string;

  @ApiProperty({ description: 'Content of the blog' })
  readonly content: string;
}