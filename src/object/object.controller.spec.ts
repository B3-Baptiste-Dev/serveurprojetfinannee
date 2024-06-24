import { Test, TestingModule } from '@nestjs/testing';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObjectDto } from './dto';

describe('ObjectController', () => {
  let controller: ObjectController;
  let service: ObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectController],
      providers: [ObjectService, PrismaService],
    }).compile();

    controller = module.get<ObjectController>(ObjectController);
    service = module.get<ObjectService>(ObjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    jest.spyOn(service, 'create').mockResolvedValue(createdObject);
    expect(await controller.create(createObjectDto)).toEqual(createdObject);
  });
});
