import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Annonce } from '@prisma/client';
import { CreateAnnonceDto } from './dto';

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
