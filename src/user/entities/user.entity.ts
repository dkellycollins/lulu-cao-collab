import { File } from 'src/file/entities/file.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToOne(type => File, file => file.user)
  @JoinColumn()
  profilePicture?: File;
}