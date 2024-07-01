import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
import { Annonce } from '@prisma/client';

@Injectable()
export class AnnonceService {
    constructor(private prisma: PrismaService) {}

    async findAllAnnonces(): Promise<Annonce[]> {
        return this.prisma.annonce.findMany({
            include: {
                object: true,
            },
        });
    }

    async findAllAnnoncesWithObjects(userId: number): Promise<any[]> {
        const annonces = await this.prisma.annonce.findMany({
            where: {
                object: {
                    ownerId: userId,
                },
            },
            include: {
                object: true,
            },
        });
        return annonces;
    }

    async findAllAnnoncesWithObjectsExcludingUser(excludeUserId: number): Promise<any[]> {
        return this.prisma.annonce.findMany({
            where: {
                object: {
                    ownerId: {
                        not: excludeUserId,
                    },
                },
            },
            include: {
                object: true,
            },
        });
    }

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }

    async createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File): Promise<any> {
        if (!file || !file.buffer) {
            throw new Error('Aucun fichier téléchargé');
        }

        const fileContentBase64 = file.buffer.toString('base64');
        const imageUrlBase64 = `data:${file.mimetype};base64,${fileContentBase64}`;

        const categoryId = Number(dto.object.categoryId);
        const ownerId = Number(dto.object.ownerId);
        const latitude = Number(dto.latitude);
        const longitude = Number(dto.longitude);

        const object = await this.prisma.object.create({
            data: {
                title: dto.object.title,
                description: dto.object.description,
                categoryId,
                ownerId,
                available: dto.object.available ?? true,
                imageUrl: imageUrlBase64,
            },
        });
        return this.prisma.annonce.create({
            data: {
                objectId: object.id,
                latitude,
                longitude,
            },
        });
    }




    async findAnnoncesByCategory(categoryId: number): Promise<Annonce[]> {
        const result = await this.prisma.annonce.findMany({
            where: {
                object: {
                    categoryId,
                },
            },
            include: {
                object: {
                    include: {
                        owner: true,
                        category: true,
                    }
                }
            },
        });
        return result;
    }




    async findOneAnnonce(id: number): Promise<Annonce | null> {
        return this.prisma.annonce.findUnique({
            where: { id },
        });
    }

    async updateAnnonce(id: number, updateAnnonceDto: any): Promise<Annonce> {
        const { title, description, ...otherFields } = updateAnnonceDto;

        // Récupérer l'annonce pour obtenir l'objectId
        const annonce = await this.prisma.annonce.findUnique({
            where: { id },
            include: { object: true },
        });

        if (!annonce) {
            console.error(`Annonce avec l'ID ${id} introuvable`);
            throw new Error('Annonce introuvable');
        }

        // Mise à jour de l'objet lié
        await this.prisma.object.update({
            where: { id: annonce.objectId },
            data: {
                title,
                description,
            },
        });

        // Mise à jour de l'annonce elle-même
        const updatedAnnonce = await this.prisma.annonce.update({
            where: { id },
            data: {
                ...otherFields,
                updatedAt: new Date(),
            },
            include: { object: true },
        });

        return updatedAnnonce;
    }

    async removeAnnonce(id: number): Promise<Annonce> {
        // Ajoutez un log pour vérifier l'ID de l'annonce
        console.log(`Tentative de suppression de l'annonce avec l'ID: ${id}`);

        const annonce = await this.prisma.annonce.findUnique({
            where: { id },
        });

        if (!annonce) {
            console.error(`Annonce avec l'ID ${id} introuvable`);
            throw new Error('Annonce introuvable');
        }

        await this.prisma.reservation.deleteMany({
            where: { objectId: annonce.objectId },
        });
        await this.prisma.annonce.delete({
            where: { id },
        });
        await this.prisma.object.delete({
            where: { id: annonce.objectId },
        });

        console.log(`Annonce avec l'ID ${id} supprimée avec succès`);
        return annonce;
    }

}