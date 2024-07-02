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

    async findAllConversationsByUserId(userId: number) {
        const conversations = await this.prisma.conversation.findMany({
            where: {
                OR: [
                    { messages: { some: { sentById: userId } } },
                    { messages: { some: { receivedById: userId } } },
                ],
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    include: {
                        sentBy: true,
                        receivedBy: true
                    },
                },
                annonce: {
                    include: {
                        object: true,
                    },
                },
            },
        });

        return conversations.map(conversation => {
            const lastMessage = conversation.messages[0];
            return {
                conversationId: conversation.id,
                lastMessage: lastMessage ? lastMessage.content : '',
                userName: lastMessage ? `${lastMessage.sentBy.first_name} ${lastMessage.sentBy.last_name}` : '',
                objectTitle: conversation.annonce.object.title,
                receiverId: lastMessage.receivedBy.id,
                annonceId: conversation.annonceId,
            };
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
