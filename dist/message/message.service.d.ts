import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMessageDto: CreateMessageDto): Promise<{
        id: number;
        content: string;
        sentById: number;
        receivedById: number;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        content: string;
        sentById: number;
        receivedById: number;
        createdAt: Date;
    }[]>;
    findAllMessagesReceivedByUserId(userId: number): Promise<({
        sentBy: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
        receivedBy: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        content: string;
        sentById: number;
        receivedById: number;
        createdAt: Date;
    })[]>;
    findConversation(userId: number, otherUserId: number): Promise<({
        sentBy: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
        receivedBy: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        content: string;
        sentById: number;
        receivedById: number;
        createdAt: Date;
    })[]>;
}
