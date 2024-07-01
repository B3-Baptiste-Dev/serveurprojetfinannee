import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    content: string;

    @IsInt()
    sentById: number;

    @IsInt()
    receivedById: number;

    @IsInt()
    @IsOptional()
    conversationId?: number;

    @IsInt()
    annonceId: number;
}
