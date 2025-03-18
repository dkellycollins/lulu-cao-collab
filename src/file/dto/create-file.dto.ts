import { Blog } from "src/blog/entities/blog.entity";
import { User } from "src/user/entities/user.entity";

export class CreateFileDto {
  id: number;

  /**
   * File storage provider key
   */
  providerKey: string;

  filename: string;

  contentType: string;

  contentSize: string;

  user?: User;

  blog?: Blog;
}