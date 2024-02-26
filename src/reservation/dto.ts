import { IsDateString, IsInt, IsString } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateReservationDto {
    @IsInt()
    objectId: number;

    @IsInt()
    userId: number;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    status: string;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    @IsInt()
    objectId: number;

    @IsInt()
    userId: number;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    status: string;
}
