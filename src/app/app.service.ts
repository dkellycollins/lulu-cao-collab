import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFeaturedBlogs(): string {
    return "VibeReads - A list of featured blogs coming soon..."
  }
}
