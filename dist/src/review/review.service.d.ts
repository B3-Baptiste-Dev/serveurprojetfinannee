import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';
export declare class ReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createReviewDto: CreateReviewDto): Promise<{
        id: number;
        rating: number;
        comment: string;
        objectId: number;
        userId: number;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        object: {
            id: number;
            ownerId: number;
            title: string;
            description: string;
            location: string;
            categoryId: number;
            available: boolean;
        };
        user: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        rating: number;
        comment: string;
        objectId: number;
        userId: number;
        createdAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        object: {
            id: number;
            ownerId: number;
            title: string;
            description: string;
            location: string;
            categoryId: number;
            available: boolean;
        };
        user: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        rating: number;
        comment: string;
        objectId: number;
        userId: number;
        createdAt: Date;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        rating: number;
        comment: string;
        objectId: number;
        userId: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<void>;
}
