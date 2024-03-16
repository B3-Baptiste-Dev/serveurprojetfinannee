import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Annonce, Prisma } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AnnonceService {
    constructor(private prisma: PrismaService) {}

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }

    async createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File): Promise<any> {
        // Vérifiez si un fichier a été téléchargé
        if (!file) {
            throw new Error('Aucun fichier téléchargé');
        }

        // Lisez le fichier téléchargé
        const filePath = join(process.cwd(), file.path);
        const fileBuffer = readFileSync(filePath);

        // Encodez le contenu du fichier en base64
        const fileContentBase64 = fileBuffer.toString('base64');

        // Vous pouvez maintenant stocker `fileContentBase64` dans votre base de données
        const imageUrlBase64 = `data:${file.mimetype};base64,${fileContentBase64}`;

        // Convertir categoryId et ownerId en entiers
        const categoryId = Number(dto.object.categoryId);
        const ownerId = Number(dto.object.ownerId);
        const latitude = Number(dto.latitude);
        const longitude = Number(dto.longitude);

        // Création de l'objet avec l'URL du fichier sur le serveur FTP
        const object = await this.prisma.object.create({
            data: {
                title: dto.object.title,
                description: dto.object.description,
                categoryId, // categoryId est maintenant un nombre
                ownerId, // ownerId est maintenant un nombre
                available: dto.object.available ?? true,
                imageUrl: imageUrlBase64, // Utilisez la chaîne base64 comme URL de l'image
            },
        });

        // Création de l'annonce associée à cet objet
        return this.prisma.annonce.create({
            data: {
                objectId: object.id,
                latitude, // latitude est maintenant un nombre
                longitude, // longitude est maintenant un nombre
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
