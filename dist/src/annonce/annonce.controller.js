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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnonceController = void 0;
const common_1 = require("@nestjs/common");
const annonce_service_1 = require("./annonce.service");
const dto_1 = require("./dto");
const client_1 = require("@prisma/client");
let AnnonceController = class AnnonceController {
    constructor(annonceService) {
        this.annonceService = annonceService;
    }
    create(createAnnonceDto) {
        return this.annonceService.createAnnonce(createAnnonceDto);
    }
    findAll() {
        return this.annonceService.findAllAnnonces();
    }
    findAllWithObjects() {
        return this.annonceService.findAllAnnoncesWithObjects();
    }
    findOne(id) {
        return this.annonceService.findOneAnnonce(id);
    }
    update(id, updateAnnonceDto) {
        return this.annonceService.updateAnnonce(id, updateAnnonceDto);
    }
    remove(id) {
        return this.annonceService.removeAnnonce(id);
    }
};
exports.AnnonceController = AnnonceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAnnonceDto]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('with-objects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findAllWithObjects", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "remove", null);
exports.AnnonceController = AnnonceController = __decorate([
    (0, common_1.Controller)('annonces'),
    __metadata("design:paramtypes", [annonce_service_1.AnnonceService])
], AnnonceController);
//# sourceMappingURL=annonce.controller.js.map