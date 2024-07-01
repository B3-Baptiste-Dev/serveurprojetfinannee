import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async create(createMessageDto: CreateMessageDto) {
        return this.prisma.message.create({ data: createMessageDto });
    }

    async findAll() {
        return this.prisma.message.findMany();
    }

    async findAllMessagesReceivedByUserId(userId: number) {
        return this.prisma.message.findMany({
            where: { receivedById: userId },
            include: {
                sentBy: true,
                receivedBy: {
                    include: {
                        reservations: {
                            include: {
                                object: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findConversation(userId: number, otherUserId: number) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { sentById: userId, receivedById: otherUserId },
                    { sentById: otherUserId, receivedById: userId },
                ],
            },
            include: {
                sentBy: true,
                receivedBy: {
                    include: {
                        reservations: {
                            include: {
                                object: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }

}
