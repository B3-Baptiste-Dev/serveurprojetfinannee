import { Test, TestingModule } from '@nestjs/testing';
import { AnnonceController } from './annonce.controller';
import { AnnonceService } from './annonce.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AnnonceController', () => {
  let controller: AnnonceController;
  let service: AnnonceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnonceController],
      providers: [AnnonceService, PrismaService],
    }).compile();

    controller = module.get<AnnonceController>(AnnonceController);
    service = module.get<AnnonceService>(AnnonceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
