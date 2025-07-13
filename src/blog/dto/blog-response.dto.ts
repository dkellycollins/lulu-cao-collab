// Used in responses for GET or CREATE
import { FileResponseDto } from 'src/file/dto/file-response.dto';

export class BlogResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  coverImage?: FileResponseDto;
}
