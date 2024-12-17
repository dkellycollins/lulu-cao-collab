import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  getAllReviews(): string {
    return "A list of reviews coming soon..."
  }

  getReview(id: string): string {
    return `Review ${id}`
  }
}
