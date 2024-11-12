import { ApiProperty } from '@nestjs/swagger';

export class Blog {
  /**
   * The name of the blog
   * @example Summer Star
   */
  name: string;

  @ApiProperty({ example: "Blululu", description: 'Creator or editor' })
  author: string;

  @ApiProperty({
    example: 'There is a star in the summer',
    description: 'Content of the blog',
  })
  content: string;
}
