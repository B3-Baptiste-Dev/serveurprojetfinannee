import { MessageService } from './message.service';
import { CreateMessageDto } from './dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
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
    findAllReceived(req: any): Promise<({
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
    findAllConversation(req: any, otherUserId: number): Promise<({
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
