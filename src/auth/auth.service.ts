// AuthService.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseHelperService } from 'src/response-helper/response-helper.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private responseHelperService: ResponseHelperService,
    private jwtService: JwtService,
  ) {}

  // Login user
  async loginUser(dto: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatching = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user_id: user.id,
    };
  }

  // Register a new user
  async registerUser(dto: RegisterDTO) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userExist) {
      throw new ForbiddenException(
        'User under this email is already registered',
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    const created = await this.prisma.user.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        password: hash,
      },
    });
    delete created.password;

    const payload = { email: created.email, sub: created.id };
    const token = this.jwtService.sign(payload);

    return this.responseHelperService.returnSuccess({ access_token: token, user_id: created.id });
  }
}
