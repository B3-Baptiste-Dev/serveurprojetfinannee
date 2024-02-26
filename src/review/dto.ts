import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateReviewDto {
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsInt()
    objectId: number;

    @IsInt()
    userId: number;
}
export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    comment?: string;
}
