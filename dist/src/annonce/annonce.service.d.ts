import { PrismaService } from '../prisma/prisma.service';
import { Annonce, Prisma } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
export declare class AnnonceService {
    private prisma;
    constructor(prisma: PrismaService);
    createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce>;
    createAnnonceWithObject(dto: CreateAnnonceWithObjectDto): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllAnnonces(): Promise<Annonce[]>;
    findAllAnnoncesWithObjects(userId: number): Promise<any[]>;
    findOneAnnonce(id: number): Promise<Annonce | null>;
    updateAnnonce(id: number, updateAnnonceDto: Prisma.AnnonceUpdateInput): Promise<Annonce>;
    removeAnnonce(id: number): Promise<Annonce>;
}
