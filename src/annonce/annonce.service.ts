import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Annonce, Prisma } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AnnonceService {
    constructor(private prisma: PrismaService) {}

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }

    async createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File): Promise<any> {
        // Assurez-vous que le dossier de téléchargement existe
        const uploadsDir = path.resolve('uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Chemin local où le fichier sera enregistré
        const localPath = `uploads/${file.originalname}`;
        fs.writeFileSync(path.resolve(localPath), file.buffer);

        // Créer un nouvel objet dans la base de données
        const object = await this.prisma.object.create({
            data: {
                title: dto.object.title,
                description: dto.object.description,
                categoryId: dto.object.categoryId,
                ownerId: dto.object.ownerId,
                available: dto.object.available ?? true,
                imageUrl: localPath,
            },
        });

        // Créer une nouvelle annonce associée à cet objet
        return this.prisma.annonce.create({
            data: {
                objectId: object.id,
                latitude: dto.latitude,
                longitude: dto.longitude,
            },
        });
    }



    async findAllAnnonces(): Promise<Annonce[]> {
        return this.prisma.annonce.findMany({
            include: {
                object: true,
            },
        });
    }

    async findAllAnnoncesWithObjects(userId: number): Promise<any[]> {
        return this.prisma.annonce.findMany({
            where: {
                object: {
                    ownerId: {
                        not: userId,
                    },
                },
            },
            include: {
                object: true,
            },
        });
    }


    async findOneAnnonce(id: number): Promise<Annonce | null> {
        return this.prisma.annonce.findUnique({
            where: { id },
        });
    }

    async updateAnnonce(id: number, updateAnnonceDto: Prisma.AnnonceUpdateInput): Promise<Annonce> {
        return this.prisma.annonce.update({
            where: { id },
            data: updateAnnonceDto,
        });
    }

    async removeAnnonce(id: number): Promise<Annonce> {
        return this.prisma.annonce.delete({
            where: { id },
        });
    }
}
