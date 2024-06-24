import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';
import { CreateMessageDto } from './dto';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService, PrismaService],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a message', async () => {
    const createMessageDto: CreateMessageDto = { content: 'Test Message', sentById: 1, receivedById: 2 };
    const createdMessage: Message = {
      id: 1,
      content: 'Test Message',
      sentById: 1,
      receivedById: 2,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'create').mockImplementation(async () => createdMessage);
    expect(await controller.create(createMessageDto)).toEqual(createdMessage);
  });
});
