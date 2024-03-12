import { PrismaService } from '../prisma/prisma.service';
import { CreateObjectDto, UpdateObjectDto } from './dto';
export declare class ObjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createObjectDto: CreateObjectDto): Promise<{
        id: number;
        ownerId: number;
        title: string;
        description: string;
        location: string;
        categoryId: number;
        available: boolean;
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            name: string;
            description: string;
        };
        reservations: {
            id: number;
            objectId: number;
            userId: number;
            startDate: Date;
            endDate: Date;
            status: string;
        }[];
        reviews: {
            id: number;
            rating: number;
            comment: string;
            objectId: number;
            userId: number;
            createdAt: Date;
        }[];
        owner: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        ownerId: number;
        title: string;
        description: string;
        location: string;
        categoryId: number;
        available: boolean;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            name: string;
            description: string;
        };
        reservations: {
            id: number;
            objectId: number;
            userId: number;
            startDate: Date;
            endDate: Date;
            status: string;
        }[];
        reviews: {
            id: number;
            rating: number;
            comment: string;
            objectId: number;
            userId: number;
            createdAt: Date;
        }[];
        owner: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        ownerId: number;
        title: string;
        description: string;
        location: string;
        categoryId: number;
        available: boolean;
    }>;
    update(id: number, updateObjectDto: UpdateObjectDto): Promise<{
        id: number;
        ownerId: number;
        title: string;
        description: string;
        location: string;
        categoryId: number;
        available: boolean;
    }>;
    remove(id: number): Promise<void>;
}
