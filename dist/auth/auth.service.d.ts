import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseHelperService } from '../response-helper/response-helper.service';
export declare class AuthService {
    private prisma;
    private responseHelperService;
    private jwtService;
    constructor(prisma: PrismaService, responseHelperService: ResponseHelperService, jwtService: JwtService);
    loginUser(dto: LoginDTO): Promise<{
        access_token: string;
        user_id: number;
    }>;
    registerUser(dto: RegisterDTO): Promise<{
        success: boolean;
        data: Record<string, any>;
    }>;
}
