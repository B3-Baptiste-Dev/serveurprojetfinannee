import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Annonce, Prisma } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import * as geolib from 'geolib';

@Injectable()
export class AnnonceService {
    constructor(private prisma: PrismaService) {}

    async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }

    async findAllAnnonces(): Promise<Annonce[]> {
        return this.prisma.annonce.findMany();
    }

    async findAllAnnoncesWithObjects(): Promise<any[]> {
        return this.prisma.annonce.findMany({
            include: {
                object: true,
            },
        });
    }

    async findNearbyAnnonces(lat: number, lon: number, maxDistance: number) {
        const annonces = await this.prisma.annonce.findMany({
            include: {
                object: true,
            },
        });
        return annonces.filter((annonce) => {
            const annonceDistance = geolib.getDistance(
              { latitude: lat, longitude: lon },
              { latitude: annonce.latitude, longitude: annonce.longitude }
            );
            return annonceDistance / 1000 <= maxDistance;
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
