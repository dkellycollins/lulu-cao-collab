import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}