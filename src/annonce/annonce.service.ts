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
        if (!file || !file.buffer) {
            throw new Error('Aucun fichier téléchargé');
        }

        // Encodez le contenu du fichier en base64
        const fileContentBase64 = file.buffer.toString('base64');
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
                categoryId,
                ownerId,
                available: dto.object.available ?? true,
                imageUrl: imageUrlBase64, // Utilisez la chaîne base64 comme URL de l'image
            },
        });

        // Création de l'annonce associée à cet objet
        return this.prisma.annonce.create({
            data: {
                objectId: object.id,
                latitude,
                longitude,
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
        const annonce = await this.prisma.annonce.findUnique({
            where: { id },
        });

        if (!annonce) {
            throw new Error('Annonce introuvable');
        }

        // Supprimez d'abord toutes les réservations liées à cet objet
        await this.prisma.reservation.deleteMany({
            where: { objectId: annonce.objectId },
        });

        // Supprimez ensuite l'annonce
        await this.prisma.annonce.delete({
            where: { id },
        });

        // Enfin, supprimez l'objet lui-même
        await this.prisma.object.delete({
            where: { id: annonce.objectId },
        });

        return annonce;
    }

}