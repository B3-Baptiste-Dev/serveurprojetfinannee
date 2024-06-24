import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationService.create(createReservationDto);
    }

    @Get()
    findAll() {
        return this.reservationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reservationService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateReservationDto: UpdateReservationDto) {
        return this.reservationService.update(id, updateReservationDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.reservationService.remove(id);
    }
}
