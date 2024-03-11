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
    async findOneAnnonce(id) {
        return this.prisma.annonce.findUnique({
            where: { id },
        });
    }
    async updateAnnonce(id, updateAnnonceDto) {
        return this.prisma.annonce.update({
            where: { id },
            data: updateAnnonceDto,
        });
    }
    async removeAnnonce(id) {
        return this.prisma.annonce.delete({
            where: { id },
        });
    }
};
exports.AnnonceService = AnnonceService;
exports.AnnonceService = AnnonceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnonceService);
//# sourceMappingURL=annonce.service.js.map