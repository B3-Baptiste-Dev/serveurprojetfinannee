import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(dto: LoginDTO): Promise<{
        access_token: string;
        user_id: number;
    }>;
    registerUser(dto: RegisterDTO): Promise<{
        success: boolean;
        data: Record<string, any>;
    }>;
}
