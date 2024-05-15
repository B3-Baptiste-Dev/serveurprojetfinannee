import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({ data: createCategoryDto });
    }

    async findAll() {
        return this.prisma.category.findMany();
    }

    async findAllWithObjects(categorieId: number) {
        return this.prisma.category.findMany({
            where: { id: categorieId },
            include: { objects: true },
        });
    }

    async findOne(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }
        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        try {
            return await this.prisma.category.update({
                where: { id },
                data: updateCategoryDto,
            });
        } catch (error) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.category.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }
    }
}
