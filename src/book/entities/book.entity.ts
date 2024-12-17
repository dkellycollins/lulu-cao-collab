import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({ description: 'Book ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Book Name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Book Author' })
  @Column()
  author: string;

  @ApiProperty({ description: 'Book Category' })
  @Column()
  category: string;

  @ApiProperty({ description: 'Publication year' })
  @Column()
  publicationYear: number;

  @ApiProperty({ description: 'Cover image for the book' })
  @Column()
  image: string;
}