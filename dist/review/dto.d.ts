export declare class CreateReviewDto {
    rating: number;
    comment?: string;
    objectId: number;
    userId: number;
}
declare const UpdateReviewDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReviewDto>>;
export declare class UpdateReviewDto extends UpdateReviewDto_base {
    rating: number;
    comment?: string;
}
export {};
