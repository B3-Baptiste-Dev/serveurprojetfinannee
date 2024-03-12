export declare class CreateObjectDto {
    ownerId: number;
    title: string;
    description: string;
    categoryId: number;
    available?: boolean;
}
declare const UpdateObjectDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateObjectDto>>;
export declare class UpdateObjectDto extends UpdateObjectDto_base {
    ownerId?: number;
    title?: string;
    description?: string;
    categoryId?: number;
    available?: boolean;
}
export {};
