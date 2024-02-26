import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        description: string;
    }>;
    remove(id: number): Promise<void>;
}
