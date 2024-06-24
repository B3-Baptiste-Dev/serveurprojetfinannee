"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ObjectService = class ObjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createObjectDto) {
        return this.prisma.object.create({ data: createObjectDto });
    }
    async findAll() {
        return this.prisma.object.findMany({
            include: { owner: true, category: true, reservations: true, reviews: true },
        });
    }
    async findOne(id) {
        const object = await this.prisma.object.findUnique({
            where: { id },
            include: { owner: true, category: true, reservations: true, reviews: true },
        });
        if (!object) {
            throw new common_1.NotFoundException(`Object with ID "${id}" not found`);
        }
        return object;
    }
    async update(id, updateObjectDto) {
        try {
            return await this.prisma.object.update({
                where: { id },
                data: updateObjectDto,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Object with ID "${id}" not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.object.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Object with ID "${id}" not found`);
        }
    }
};
exports.ObjectService = ObjectService;
exports.ObjectService = ObjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ObjectService);
//# sourceMappingURL=object.service.js.map