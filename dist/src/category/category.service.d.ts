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
