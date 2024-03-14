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
        const localPath = file ? `uploads/${file.originalname}` : '';

        // Convertir categoryId et ownerId en entiers
        const categoryId = Number(dto.object.categoryId);
        const ownerId = Number(dto.object.ownerId);

        if (isNaN(categoryId) || isNaN(ownerId)) {
            throw new Error("categoryId et ownerId doivent être des nombres valides.");
        }

        const latitude = Number(dto.latitude);
        const longitude = Number(dto.longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error("Latitude et longitude doivent être des nombres valides.");
        }


        const object = await this.prisma.object.create({
            data: {
                title: dto.object.title,
                description: dto.object.description,
                categoryId, // categoryId est maintenant un nombre
                ownerId, // ownerId est maintenant un nombre
                available: dto.object.available ?? true,
                imageUrl: localPath,
            },
        });

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
