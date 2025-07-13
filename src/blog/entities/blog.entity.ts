import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { User } from '../../user/entities/user.entity';
import { File } from '../../file/entities/file.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => File, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'cover_image_id' })
  coverImage?: File; // coverImage now owns the relationship via foreign key (cover_image_id)

  @ManyToOne(() => User, user => user.blogs)
  @JoinColumn({ name: 'author_id' })
  author: User;
}