import { File } from "src/file/entities/file.entity";

export class CreateBlogDto {
  id: number;

  /** 
  * Title of the blog
  */
  title: string;

  /**
  * Content of the blog
  */
  content: string;

  createdAt: Date;

  updatedAt: Date;

  image?: File;
}

