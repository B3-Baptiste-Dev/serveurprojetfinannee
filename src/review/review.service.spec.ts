import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from 'src/review/dto';

describe('ReviewService', () => {
  let service: ReviewService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService, PrismaService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    prismaService.review.create = jest.fn().mockResolvedValue(createdReview);
    const result = await service.create(createReviewDto);
    expect(result).toEqual(createdReview);
  });
});
