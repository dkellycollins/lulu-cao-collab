import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) { // Inherit all properties of CreateBlogDto as optional properties
  id: number;
}
