import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async create(createMessageDto: CreateMessageDto) {
        const { sentById, receivedById, content, conversationId } = createMessageDto;

        // Vérifier si la conversation existe
        const conversation = await this.prisma.conversation.findUnique({
            where: { id: conversationId }
        });

        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        // Créer le message dans la conversation existante
        return this.prisma.message.create({
            data: {
                content,
                sentById,
                receivedById,
                conversationId
            }
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
