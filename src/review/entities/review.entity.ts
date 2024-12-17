import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Review {
  @ApiProperty({ description: 'Review ID' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'The date when the reviewer starts reviewing the book' })
  @Column()
  startDate: Date;

  @ApiProperty({ description: 'Has the reviewer finished the book?' })
  @Column()
  hasFinishedBook: boolean;

  @ApiProperty({ description: 'Ratings out of 10' })
  @Column()
  rating: number;
}