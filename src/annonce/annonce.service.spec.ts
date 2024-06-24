import { Test, TestingModule } from '@nestjs/testing';
import { AnnonceService } from './annonce.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AnnonceService', () => {
  let service: AnnonceService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnonceService, PrismaService],
    }).compile();

    service = module.get<AnnonceService>(AnnonceService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an annonce', async () => {
    const createAnnonceDto = {
      latitude: 45.0,
      longitude: 90.0,
      object: {
        title: 'Test Object',
        description: 'Test Description',
        categoryId: 1,
        ownerId: 1,
        available: true,
        imageUrl: 'test-image-url',
      },
    };
    prismaService.annonce.create = jest.fn().mockResolvedValue(createAnnonceDto);
    const result = await service.createAnnonceWithObject(createAnnonceDto, { buffer: Buffer.from(''), mimetype: 'image/jpeg' } as Express.Multer.File);
    expect(result).toEqual(createAnnonceDto);
  });
});
