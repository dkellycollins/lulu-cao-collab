// Used in request body for POST
export class CreateBlogDto {
  title: string;
  content: string;
  coverImageId?: number;
}

