import { Blog } from '../../blog/entities/blog.entity';
import { File } from '../../file/entities/file.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToOne(() => File, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'profile_picture_id' })
  profilePicture?: File; // profilePicture now owns the relationship via foreign key (profile_picture_id)

  @OneToMany(() => Blog, blog => blog.author)
  blogs?: Blog[];
}