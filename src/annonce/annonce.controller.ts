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
import { CreateObjectDto } from '../object/dto';


@Controller('annonces')
export class AnnonceController {
    constructor(private readonly annonceService: AnnonceService) {}

    // @Post()
    // create(@Body() createAnnonceDto: CreateAnnonceDto) {
    //     return this.annonceService.createAnnonce(createAnnonceDto);
    // }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(
      @Body('object') objectString: string,
      @Body('latitude') latitude: number,
      @Body('longitude') longitude: number,
      @UploadedFile() file: Express.Multer.File
    ) {
        const object = JSON.parse(objectString);

        // Créez ici un DTO ou un objet littéral qui correspond à votre structure attendue
        const createAnnonceWithObjectDto: CreateAnnonceWithObjectDto = {
            latitude,
            longitude,
            object: new CreateObjectDto(object.title, object.description, object.categoryId, object.ownerId, object.available),
        };

        console.log("DTO reçu:", JSON.stringify(createAnnonceWithObjectDto, null, 2));
        console.log("Fichier reçu:", file ? file.originalname : 'Aucun fichier');

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
