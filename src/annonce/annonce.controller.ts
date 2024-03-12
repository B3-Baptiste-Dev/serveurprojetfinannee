import {
    Controller,
    Post,
    UseGuards,
    Body,
    UseInterceptors,
    UploadedFile,
    Get,
    Query,
    Param,
    ParseIntPipe, Put, Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
import { Prisma } from '@prisma/client';


@Controller('annonces')
export class AnnonceController {
    constructor(private readonly annonceService: AnnonceService) {}

    // @Post()
    // create(@Body() createAnnonceDto: CreateAnnonceDto) {
    //     return this.annonceService.createAnnonce(createAnnonceDto);
    // }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(
      @Body() createAnnonceWithObjectDto: CreateAnnonceWithObjectDto,
      @UploadedFile() file: Express.Multer.File
    ) {
        console.log("DTO reçu:", createAnnonceWithObjectDto); // Affiche les données reçues dans le DTO
        console.log("Fichier reçu:", file); // Affiche les informations du fichier reçu

        return this.annonceService.createAnnonceWithObject(createAnnonceWithObjectDto, file);
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
