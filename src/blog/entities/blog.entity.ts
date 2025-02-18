import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { User } from 'src/user/entities/user.entity';
import { File } from 'src/file/entities/file.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The title of the blog
   * @example Summer Star
   */
  @Column()
  title: string;

  /**
   * @example There is a star in the summer
   */
  @Column()
  content?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(type => File, file => file.blog)
  @JoinColumn()
  image?: File;

  @ManyToOne(type => User, user => user.blog)
  user: User;
}