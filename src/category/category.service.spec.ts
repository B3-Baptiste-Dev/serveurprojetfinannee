import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto = { name: 'Test Category' };
    prismaService.category.create = jest.fn().mockResolvedValue(createCategoryDto);
    const result = await service.create(createCategoryDto);
    expect(result).toEqual(createCategoryDto);
  });
});
