import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';

@Injectable()
export class ReservationService {
    constructor(private prisma: PrismaService) {}

    async create(createReservationDto: CreateReservationDto) {
        return this.prisma.reservation.create({ data: createReservationDto });
    }

    async findAll() {
        return this.prisma.reservation.findMany({
            include: { object: true, user: true },
        });
    }

    async findOne(id: number) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: { object: true, user: true },
        });
        if (!reservation) {
            throw new NotFoundException(`Reservation with ID "${id}" not found`);
        }
        return reservation;
    }

    async update(id: number, updateReservationDto: UpdateReservationDto) {
        try {
            return await this.prisma.reservation.update({
                where: { id },
                data: updateReservationDto,
            });
        } catch (error) {
            throw new NotFoundException(`Reservation with ID "${id}" not found`);
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.reservation.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException(`Reservation with ID "${id}" not found`);
        }
    }
}
