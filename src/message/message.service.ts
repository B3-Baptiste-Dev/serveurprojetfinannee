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
            // Vérifier si la conversation existe
            conversation = await this.prisma.conversation.findUnique({
                where: { id: conversationId }
            });

            if (!conversation) {
                throw new NotFoundException('Conversation not found');
            }
        } else {
            // Vérifier s'il existe déjà une conversation pour cette annonce et ces utilisateurs
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
                // Créer une nouvelle conversation si elle n'existe pas
                conversation = await this.prisma.conversation.create({
                    data: {
                        annonceId
                    }
                });
            }
        }

        // Créer le message dans la conversation existante ou nouvellement créée
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
