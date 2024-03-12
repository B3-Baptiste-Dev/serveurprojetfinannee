import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';

@Controller('annonces')
export class AnnonceController {
    constructor(private readonly annonceService: AnnonceService) {}

    // @Post()
    // create(@Body() createAnnonceDto: CreateAnnonceDto) {
    //     return this.annonceService.createAnnonce(createAnnonceDto);
    // }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createAnnonceWithObjectDto: CreateAnnonceWithObjectDto) {
        return this.annonceService.createAnnonceWithObject(createAnnonceWithObjectDto);
    }

    @Get()
    findAll() {
        return this.annonceService.findAllAnnonces();
    }

    @Get('with-objects')
    findAllWithObjects(@Query('userId') userId?: string) {
        return this.annonceService.findAllAnnoncesWithObjects(Number(userId));
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.annonceService.findOneAnnonce(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateAnnonceDto: Prisma.AnnonceUpdateInput) {
        return this.annonceService.updateAnnonce(id, updateAnnonceDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.annonceService.removeAnnonce(id);
    }
}
