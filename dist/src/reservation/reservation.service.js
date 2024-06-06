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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReservationService = class ReservationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createReservationDto) {
        return this.prisma.reservation.create({ data: createReservationDto });
    }
    async findAll() {
        return this.prisma.reservation.findMany({
            include: { object: true, user: true },
        });
    }
    async findOne(id) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
            include: { object: true, user: true },
        });
        if (!reservation) {
            throw new common_1.NotFoundException(`Reservation with ID "${id}" not found`);
        }
        return reservation;
    }
    async update(id, updateReservationDto) {
        try {
            return await this.prisma.reservation.update({
                where: { id },
                data: updateReservationDto,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Reservation with ID "${id}" not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.reservation.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Reservation with ID "${id}" not found`);
        }
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map