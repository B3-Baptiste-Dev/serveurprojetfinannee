import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async create(createMessageDto: CreateMessageDto) {
        return this.prisma.message.create({
            data: {
                content: createMessageDto.content,
                sentById: createMessageDto.sentById,
                receivedById: createMessageDto.receivedById,
                conversationId: createMessageDto.conversationId,  // Ajouter cette ligne
            },
        });
    }

    async findAll() {
        return this.prisma.message.findMany();
    }

    async findAllMessagesReceivedByUserId(userId: number) {
        return this.prisma.message.findMany({
            where: { receivedById: userId },
            include: {
                sentBy: true,
                receivedBy: true,
                conversation: {
                    include: {
                        annonce: {
                            include: {
                                object: true
                            }
                        }
                    }
                }
            }
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
                receivedBy: true,
                conversation: {
                    include: {
                        annonce: {
                            include: {
                                object: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }
}
