import { Test, TestingModule } from '@nestjs/testing';
import { ObjectService } from './object.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObjectDto, UpdateObjectDto } from './dto';

describe('ObjectService', () => {
  let service: ObjectService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectService, PrismaService],
    }).compile();

    service = module.get<ObjectService>(ObjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an object', async () => {
    const createObjectDto: CreateObjectDto = {
      title: 'Test Object',
      description: 'Test Description',
      categoryId: 1,
      ownerId: 1,
      available: true,
      imageUrl: 'test-image-url',
    };
    const createdObject = {
      id: 1,
      ...createObjectDto,
      available: true,
    };

    jest.spyOn(prismaService.object, 'create').mockResolvedValue(createdObject);
    expect(await service.create(createObjectDto)).toEqual(createdObject);
  });
});
