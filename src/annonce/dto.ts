import { IsNumber, IsOptional } from 'class-validator';

export class CreateAnnonceDto {
    @IsNumber()
    objectId: number;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsNumber()
    createdAt?: Date;

    @IsOptional()
    @IsNumber()
    updatedAt?: Date;
}