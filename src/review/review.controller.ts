import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ReviewService } from './review.service';

@ApiBearerAuth()
@ApiTags('reviews')
@Controller('reviews') // Naming a nesting route called `/reviews`
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: "Get all reviews" })
  @Get()
  findAll(): string {
    return 'this.reviewService.getAllReviews()';
  }

  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the review' })
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return 'this.reviewService.getReview(+id)';
  }

  @ApiOperation({ summary: 'Create a new review' })
  @Post()
  create(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Update a review' })
  @ApiParam({ name: 'id', description: 'The ID of the review' })
  @Put(':id')
  update(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Delete a review' })
  @ApiParam({ name: 'id', description: 'The ID of the review' })
  @Delete(':id')
  delete(): Promise<void> {
    return
  }
}
