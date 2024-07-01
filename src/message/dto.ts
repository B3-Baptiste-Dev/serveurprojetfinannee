import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    content: string;

    @IsInt()
    sentById: number;

    @IsInt()
    receivedById: number;

    @IsInt()
    conversationId: number;
}
