import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto';
import { Prisma } from '@prisma/client';
export declare class AnnonceController {
    private readonly annonceService;
    constructor(annonceService: AnnonceService);
    create(createAnnonceDto: CreateAnnonceDto): Promise<{
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
    findAllWithObjects(): Promise<any[]>;
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
