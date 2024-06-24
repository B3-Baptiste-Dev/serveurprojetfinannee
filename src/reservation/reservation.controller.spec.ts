import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [ReservationService, PrismaService],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a reservation', async () => {
    const createReservationDto: CreateReservationDto = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      objectId: 1,
      userId: 1,
      status: 'Pending',
    };
    const createdReservation = {
      id: 1,
      ...createReservationDto,
      startDate: new Date(createReservationDto.startDate),
      endDate: new Date(createReservationDto.endDate),
    };

    jest.spyOn(service, 'create').mockResolvedValue(createdReservation);
    expect(await controller.create(createReservationDto)).toEqual(createdReservation);
  });
});
