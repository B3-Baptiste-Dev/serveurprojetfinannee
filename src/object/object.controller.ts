import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDto, UpdateObjectDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Objects')
@Controller('object')
export class ObjectController {
    constructor(private readonly objectService: ObjectService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createObjectDto: CreateObjectDto) {
        return this.objectService.create(createObjectDto);
    }

    @Get()
    findAll() {
        return this.objectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.objectService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateObjectDto: UpdateObjectDto) {
        return this.objectService.update(id, updateObjectDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.objectService.remove(id);
    }
}
