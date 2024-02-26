import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseHelperService } from 'src/response-helper/response-helper.service';
import { JwtService } from '@nestjs/jwt';
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
