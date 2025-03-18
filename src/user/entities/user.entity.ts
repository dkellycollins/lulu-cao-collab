import { Blog } from 'src/blog/entities/blog.entity';
import { File } from 'src/file/entities/file.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany(() => File, file => file.user)
  profilePictures?: File[];

  @OneToMany(() => Blog, blog => blog.author)
  blogs?: Blog[]
}