import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get('with-objects')
    findAllWithObjects(@Query('categorieId') id: number) { // Typing categorieId as number
        return this.categoryService.findAllWithObjects(id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.remove(id);
    }
}
