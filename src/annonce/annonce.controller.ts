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

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
      @Body() body: any, // Recevez tout le corps comme un objet générique
      @UploadedFile() file: Express.Multer.File
    ) {
        // Le champ 'object' est déjà une chaîne dans 'body', donc pas besoin de @Body('object') ici
        const objectString = body.object;
        console.log(body); // Vérifiez le contenu de `body` pour vous assurer que `object` est présent
        if (!objectString) {
            throw new Error('Le champ "object" est manquant ou invalide');
        }

        let object;
        try {
            object = JSON.parse(objectString);
        } catch (error) {
            throw new Error('Le format du champ "object" est invalide');
        }

        // Conversion de 'latitude' et 'longitude' à partir de 'body'
        const latitude = parseFloat(body.latitude);
        const longitude = parseFloat(body.longitude);
        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Latitude ou longitude invalide');
        }

        const createAnnonceWithObjectDto: CreateAnnonceWithObjectDto = {
            latitude,
            longitude,
            object: {
                ...object,
                imageUrl: file ? `uploads/${file.filename}` : '', // Gérez l'image reçue
            },
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
