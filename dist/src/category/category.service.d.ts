import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findAllWithObjects(categorieId: number): Promise<({
        objects: {
            id: number;
            ownerId: number;
            title: string;
            description: string;
            imageUrl: string;
            categoryId: number;
            available: boolean;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
    })[]>;
    search(query: string): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    remove(id: number): Promise<void>;
}
