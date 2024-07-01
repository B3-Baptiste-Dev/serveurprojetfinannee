import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}

    async create(createMessageDto: CreateMessageDto) {
        const { sentById, receivedById, content, conversationId, annonceId } = createMessageDto;

        let conversation;

        if (conversationId) {
            conversation = await this.prisma.conversation.findUnique({
                where: { id: conversationId }
            });

            if (!conversation) {
                throw new NotFoundException('Conversation not found');
            }
        } else {
            conversation = await this.prisma.conversation.findFirst({
                where: {
                    annonceId: annonceId,
                    messages: {
                        some: {
                            sentById: sentById,
                            receivedById: receivedById
                        }
                    }
                }
            });

            if (!conversation) {
                conversation = await this.prisma.conversation.create({
                    data: { annonceId }
                });
            }
        }

        return this.prisma.message.create({
            data: {
                content,
                sentById,
                receivedById,
                conversationId: conversation.id
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

    async findMessagesInConversation(conversationId: number) {
        return this.prisma.message.findMany({
            where: { conversationId },
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
            orderBy: { createdAt: 'asc' }
        });
    }
}
