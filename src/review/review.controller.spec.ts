import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from 'src/review/dto';

describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService, PrismaService],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a review', async () => {
    const createReviewDto: CreateReviewDto = {
      rating: 5,
      objectId: 1,
      userId: 1,
    };
    const createdReview = {
      id: 1,
      rating: createReviewDto.rating,
      comment: 'Test Review',
      objectId: createReviewDto.objectId,
      userId: createReviewDto.userId,
      createdAt: new Date(),
    };
    jest.spyOn(service, 'create').mockImplementation(async () => createdReview);
    expect(await controller.create(createReviewDto)).toEqual(createdReview);
  });
});
