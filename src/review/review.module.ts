import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])], // Register the Review repository for the Review entity
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
