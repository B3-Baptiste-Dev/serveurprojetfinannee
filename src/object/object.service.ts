import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObjectDto, UpdateObjectDto } from './dto';

@Injectable()
export class ObjectService {
    constructor(private prisma: PrismaService) {}

    async create(createObjectDto: CreateObjectDto) {
        return this.prisma.object.create({ data: createObjectDto });
    }

    async findAll() {
        return this.prisma.object.findMany({
            include: { owner: true, category: true, reservations: true, reviews: true },
        });
    }

    async findOne(id: number) {
        const object = await this.prisma.object.findUnique({
            where: { id },
            include: { owner: true, category: true, reservations: true, reviews: true },
        });
        if (!object) {
            throw new NotFoundException(`Object with ID "${id}" not found`);
        }
        return object;
    }

    async update(id: number, updateObjectDto: UpdateObjectDto) {
        try {
            return await this.prisma.object.update({
                where: { id },
                data: updateObjectDto,
            });
        } catch (error) {
            throw new NotFoundException(`Object with ID "${id}" not found`);
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.object.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException(`Object with ID "${id}" not found`);
        }
    }
}
