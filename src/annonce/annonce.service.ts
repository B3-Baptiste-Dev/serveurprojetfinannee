import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Annonce, Prisma } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AnnonceService {
    constructor(private prisma: PrismaService) {}

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }

    async createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File): Promise<any> {
        if (!file) {
            throw new Error('Aucun fichier téléchargé');
        }

        if (!file || !file.path) {
            throw new Error('Le chemin du fichier est manquant ou invalide');
        }
        const filePath = path.resolve(file.path);
        const fileBuffer = fs.readFileSync(filePath);

        console.log("Chemin du fichier reçu:", file ? file.path : 'Chemin indéfini');

        // Encodez le contenu du fichier en base64
        const fileContentBase64 = fileBuffer.toString('base64');

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
