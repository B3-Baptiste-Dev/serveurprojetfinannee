import { IsBoolean, IsInt, IsString, IsOptional } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateObjectDto {
    @IsInt()
    ownerId: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;

    @IsInt()
    categoryId: number;

    @IsBoolean()
    @IsOptional()
    available?: boolean = true;
}

export class UpdateObjectDto extends PartialType(CreateObjectDto) {
    @IsInt()
    @IsOptional()
    ownerId?: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    imageUrl: string;

    @IsInt()
    @IsOptional()
    categoryId?: number;

    @IsBoolean()
    @IsOptional()
    available?: boolean;
}