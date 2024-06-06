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
exports.AnnonceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnnonceService = class AnnonceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAnnonce(createAnnonceDto) {
        return this.prisma.annonce.create({
            data: createAnnonceDto,
        });
    }
    async createAnnonceWithObject(dto, file) {
        if (!file || !file.buffer) {
            throw new Error('Aucun fichier téléchargé');
        }
        const fileContentBase64 = file.buffer.toString('base64');
        const imageUrlBase64 = `data:${file.mimetype};base64,${fileContentBase64}`;
        const categoryId = Number(dto.object.categoryId);
        const ownerId = Number(dto.object.ownerId);
        const latitude = Number(dto.latitude);
        const longitude = Number(dto.longitude);
        const object = await this.prisma.object.create({
            data: {
                title: dto.object.title,
                description: dto.object.description,
                categoryId,
                ownerId,
                available: dto.object.available ?? true,
                imageUrl: imageUrlBase64,
            },
        });
        return this.prisma.annonce.create({
            data: {
                objectId: object.id,
                latitude,
                longitude,
            },
        });
    }
    async findAllAnnonces() {
        return this.prisma.annonce.findMany({
            include: {
                object: true,
            },
        });
    }
    async findAllAnnoncesWithObjects(userId) {
        return this.prisma.annonce.findMany({
            where: {
                object: {
                    ownerId: {
                        not: userId,
                    },
                },
            },
            include: {
                object: true,
            },
        });
    }
    async findAnnoncesByCategory(categoryId) {
        const result = await this.prisma.annonce.findMany({
            where: {
                object: {
                    categoryId,
                },
            },
            include: {
                object: {
                    include: {
                        owner: true,
                        category: true,
                    }
                }
            },
        });
        return result;
    }
    async findOneAnnonce(id) {
        return this.prisma.annonce.findUnique({
            where: { id },
        });
    }
    async removeAnnonce(id) {
        const annonce = await this.prisma.annonce.findUnique({
            where: { id },
        });
        if (!annonce) {
            throw new Error('Annonce introuvable');
        }
        await this.prisma.reservation.deleteMany({
            where: { objectId: annonce.objectId },
        });
        await this.prisma.annonce.delete({
            where: { id },
        });
        await this.prisma.object.delete({
            where: { id: annonce.objectId },
        });
        return annonce;
    }
};
exports.AnnonceService = AnnonceService;
exports.AnnonceService = AnnonceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnonceService);
//# sourceMappingURL=annonce.service.js.map