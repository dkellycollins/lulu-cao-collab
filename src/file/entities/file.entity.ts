import { Blog } from "../../blog/entities/blog.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * File storage provider key
   */
  @Column()
  providerKey: string;

  @Column()
  filename: string;

  @Column()
  contentType: string;

  @Column()
  contentSize: number;

  @OneToOne(()=>User, user => user.profilePicture)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(()=>Blog, blog => blog.images)
  @JoinColumn({ name: "blog_id" })
  blog?: Blog;
}