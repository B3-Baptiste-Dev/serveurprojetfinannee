import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() dto: LoginDTO) {
    return this.authService.loginUser(dto);
  }

  @Post('register')
  registerUser(@Body() dto: RegisterDTO) {
    return this.authService.registerUser(dto);
  }
}
