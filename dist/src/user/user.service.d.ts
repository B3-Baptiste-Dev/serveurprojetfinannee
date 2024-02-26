import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserById(userId: number): Promise<{
        id: number;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        location: string;
    }>;
}
