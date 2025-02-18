import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
  contentSize: string;

  @OneToOne(type => User, user => user.profilePicture)
  user?: User;
}