import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Username' })
  @Column()
  name: string;

  @ApiProperty({ description: 'User email' })
  @Column()
  email: string;

  @ApiProperty({ description: 'Firebase key' })
  @Column()
  firebaseKey: string;

  @ApiProperty({ description: 'Profile picture' })
  @Column()
  profilePicture: string;
}