import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Blog {
  @ApiProperty({ description: 'Blog ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Blog Title' })
  @Column()
  /**
   * The title of the blog
   * @example Summer Star
   */
  title: string;

  @ApiProperty({ example: "Blululu", description: 'Creator or editor' })
  @Column()
  author: string;

  @ApiProperty({
    example: 'There is a star in the summer',
    description: 'Content of the blog',
  })
  @Column()
  content: string;

  @ApiProperty({ description: 'Creation date of the blog' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}