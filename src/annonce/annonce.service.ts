import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Annonce, Prisma } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
import { Client } from 'basic-ftp';

@Injectable()
export class AnnonceService {
    constructor(private prisma: PrismaService) {}

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }

    async createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File): Promise<any> {
        // Préparation du client FTP
        const client = new Client();
        client.ftp.verbose = true; // Activez cela pour le débogage si nécessaire
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: true, // Utilisez `true` pour FTPS
        });

        // Chemin local et nom du fichier
        const localFilePath = file.path;
        const remoteFilePath = `uploads/${file.originalname}`;

        // Téléversement du fichier
        await client.uploadFrom(localFilePath, remoteFilePath);
        await client.close();

        // URL ou chemin d'accès public du fichier sur le serveur FTP
        // Vous devez ajuster cette URL en fonction de votre configuration de serveur FTP
        const imageUrl = `${process.env.FTP_PUBLIC_URL}/${remoteFilePath}`;

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
                imageUrl, // Utilisez l'URL sur le serveur FTP
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
