import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        location: string;
    }>;
}
