import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: number) {
    if (!userId) {
      throw new Error('UserID is undefined');
    }
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}