export declare class CreateCategoryDto {
    name: string;
    description?: string;
}
declare const UpdateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    name?: string;
    description?: string;
}
export {};
