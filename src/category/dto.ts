import { IsString, IsOptional } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
