/// <reference types="multer" />
import { AnnonceService } from './annonce.service';
export declare class AnnonceController {
    private readonly annonceService;
    constructor(annonceService: AnnonceService);
    create(body: any, file: Express.Multer.File): Promise<any>;
    findAll(): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllWithObjects(userId?: string): Promise<any[]>;
    findByCategory(categoryId?: string): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        objectId: number;
        latitude: number;
        longitude: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<void>;
}
