import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    async create(createReviewDto: CreateReviewDto) {
        return this.prisma.review.create({ data: createReviewDto });
    }

    async findAll() {
        return this.prisma.review.findMany({
            include: { object: true, user: true },
        });
    }

    async findOne(id: number) {
        const review = await this.prisma.review.findUnique({
            where: { id },
            include: { object: true, user: true },
        });
        if (!review) {
            throw new NotFoundException(`Review with ID "${id}" not found`);
        }
        return review;
    }

    async update(id: number, updateReviewDto: UpdateReviewDto) {
        try {
            return await this.prisma.review.update({
                where: { id },
                data: updateReviewDto,
            });
        } catch (error) {
            throw new NotFoundException(`Review with ID "${id}" not found`);
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.review.delete({ where: { id } });
        } catch (error) {
            throw new NotFoundException(`Review with ID "${id}" not found`);
        }
    }
}
