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

    async createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File) {
        const uploadsDir = path.resolve('uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        const localPath = `uploads/${file.originalname}`;
        fs.writeFileSync(path.resolve(localPath), file.buffer);
        const object = await this.prisma.object.create({
            data: {
                title: dto.object.title, // Accès à 'title' à travers 'object'
                description: dto.object.description, // Accès à 'description' à travers 'object'
                ownerId: +dto.object.ownerId, // Assurez-vous que 'ownerId' est un nombre
                categoryId: +dto.object.categoryId, // Assurez-vous que 'categoryId' est un nombre
                available: dto.object.available, // Accès à 'available' à travers 'object'
                imageUrl: localPath,
            },
        });
        return this.prisma.annonce.create({
            data: {
                objectId: +object.id,
                latitude: +dto.latitude,
                longitude: +dto.longitude,
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
