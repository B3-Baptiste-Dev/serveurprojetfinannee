import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto';

describe('ReservationService', () => {
  let service: ReservationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService, PrismaService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    jest.spyOn(prismaService.reservation, 'create').mockResolvedValue(createdReservation);
    expect(await service.create(createReservationDto)).toEqual(createdReservation);
  });
});
