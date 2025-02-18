export class CreateBlogDto {
  /** 
  * Title of the blog
  */
  readonly title: string;

  /**
  * Author of the blog
  */
  readonly author: string;

  /**
  * Content of the blog
  */
  readonly content: string;
}

