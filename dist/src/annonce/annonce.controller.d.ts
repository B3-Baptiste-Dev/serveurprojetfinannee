import { AnnonceService } from './annonce.service';
import { Prisma } from '@prisma/client';
import { CreateAnnonceWithObjectDto } from './createAnnonceWithObjectDTO';
export declare class AnnonceController {
    private readonly annonceService;
    constructor(annonceService: AnnonceService);
    create(createAnnonceWithObjectDto: CreateAnnonceWithObjectDto): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllWithObjects(userId?: string): Promise<any[]>;
    findOne(id: number): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateAnnonceDto: Prisma.AnnonceUpdateInput): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
