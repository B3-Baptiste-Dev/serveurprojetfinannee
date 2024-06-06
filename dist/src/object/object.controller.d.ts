import { ObjectService } from './object.service';
import { CreateObjectDto, UpdateObjectDto } from './dto';
export declare class ObjectController {
    private readonly objectService;
    constructor(objectService: ObjectService);
    create(createObjectDto: CreateObjectDto): Promise<{
        id: number;
        ownerId: number;
        title: string;
        description: string;
        imageUrl: string;
        categoryId: number;
        available: boolean;
    }>;
    findAll(): Promise<({
        owner: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
        category: {
            id: number;
            name: string;
            description: string;
        };
        reviews: {
            id: number;
            rating: number;
            comment: string;
            objectId: number;
            userId: number;
            createdAt: Date;
        }[];
        reservations: {
            id: number;
            objectId: number;
            userId: number;
            startDate: Date;
            endDate: Date;
            status: string;
        }[];
    } & {
        id: number;
        ownerId: number;
        title: string;
        description: string;
        imageUrl: string;
        categoryId: number;
        available: boolean;
    })[]>;
    findOne(id: number): Promise<{
        owner: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
        category: {
            id: number;
            name: string;
            description: string;
        };
        reviews: {
            id: number;
            rating: number;
            comment: string;
            objectId: number;
            userId: number;
            createdAt: Date;
        }[];
        reservations: {
            id: number;
            objectId: number;
            userId: number;
            startDate: Date;
            endDate: Date;
            status: string;
        }[];
    } & {
        id: number;
        ownerId: number;
        title: string;
        description: string;
        imageUrl: string;
        categoryId: number;
        available: boolean;
    }>;
    update(id: number, updateObjectDto: UpdateObjectDto): Promise<{
        id: number;
        ownerId: number;
        title: string;
        description: string;
        imageUrl: string;
        categoryId: number;
        available: boolean;
    }>;
    remove(id: number): Promise<void>;
}
