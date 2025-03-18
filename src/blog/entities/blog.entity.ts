import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { User } from 'src/user/entities/user.entity';
import { File } from 'src/file/entities/file.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The title of the blog
   */
  @Column()
  title: string;

  /**
   * The content of the blog
   */
  @Column()
  content?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => File, file => file.blog)
  images?: File[];

  @ManyToOne(() => User, user => user.blogs)
  @JoinColumn({ name: "author_id" })
  author: User;
}