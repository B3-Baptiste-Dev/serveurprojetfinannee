/// <reference types="multer" />
import { PrismaService } from '../prisma/prisma.service';
import { Annonce } from '@prisma/client';
import { CreateAnnonceDto } from './dto';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
export declare class AnnonceService {
    private prisma;
    constructor(prisma: PrismaService);
    createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<Annonce>;
    createAnnonceWithObject(dto: CreateAnnonceWithObjectDto, file: Express.Multer.File): Promise<any>;
    findAllAnnonces(): Promise<Annonce[]>;
    findAllAnnoncesWithObjects(userId: number): Promise<any[]>;
    findAnnoncesByCategory(categoryId: number): Promise<Annonce[]>;
    findOneAnnonce(id: number): Promise<Annonce | null>;
    removeAnnonce(id: number): Promise<Annonce>;
}
