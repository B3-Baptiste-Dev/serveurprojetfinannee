export declare class CreateReservationDto {
    objectId: number;
    userId: number;
    startDate: string;
    endDate: string;
    status: string;
}
declare const UpdateReservationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReservationDto>>;
export declare class UpdateReservationDto extends UpdateReservationDto_base {
    objectId: number;
    userId: number;
    startDate: string;
    endDate: string;
    status: string;
}
export {};
