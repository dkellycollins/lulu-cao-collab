import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  hello(): string {
    return "VibeReads - A list of featured blogs coming soon..."
  }
}
