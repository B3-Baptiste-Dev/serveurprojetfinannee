import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MessageService', () => {
  let service: MessageService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, PrismaService],
    }).compile();

    service = module.get<MessageService>(MessageService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    const createMessageDto = { content: 'Test Message', sentById: 1, receivedById: 2 };
    prismaService.message.create = jest.fn().mockResolvedValue(createMessageDto);
    const result = await service.create(createMessageDto);
    expect(result).toEqual(createMessageDto);
  });
});
