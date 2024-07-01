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
import { Annonce, Prisma } from '@prisma/client';
import { CreateObjectDto } from '../object/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Annonces')
@Controller('annonces')
export class AnnonceController {
    constructor(private readonly annonceService: AnnonceService) {}

    @Get()
    findAll() {
        return this.annonceService.findAllAnnonces();
    }

    @Get('with-objects')
    findAllWithObjects(@Query('userId') userId?: string) {
        return this.annonceService.findAllAnnoncesWithObjects(Number(userId));
    }

    @Get('excludeUserId')
    findAllWithObjectsexcludeUserId(@Query('excludeUserId') excludeUserId?: string) {
        return this.annonceService.findAllAnnoncesWithObjectsExcludingUser(Number(excludeUserId));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
      @Body() body: any,
      @UploadedFile() file: Express.Multer.File
    ) {
        const objectString = body.object;
        console.log(body);
        if (!objectString) {
            throw new Error('Le champ "object" est manquant ou invalide');
        }
        let object;
        try {
            object = JSON.parse(objectString);
        } catch (error) {
            throw new Error('Le format du champ "object" est invalide');
        }
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
                imageUrl: file ? `uploads/${file.filename}` : '',
            },
        };
        console.log("DTO reçu:", JSON.stringify(createAnnonceWithObjectDto, null, 2));
        console.log("Fichier reçu:", file ? file.originalname : 'Aucun fichier');
        return this.annonceService.createAnnonceWithObject(createAnnonceWithObjectDto, file);
    }



    @Get('by-category')
    findByCategory(@Query('categoriesId') categoryId?: string) {
        return this.annonceService.findAnnoncesByCategory(Number(categoryId));
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.annonceService.findOneAnnonce(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateAnnonceDto: any) {
        return this.annonceService.updateAnnonce(id, updateAnnonceDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id', ParseIntPipe) id: number): Promise<Annonce> {
        return this.annonceService.removeAnnonce(id);
    }

}
