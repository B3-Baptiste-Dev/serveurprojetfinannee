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
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const annonce_service_1 = require("./annonce.service");
const swagger_1 = require("@nestjs/swagger");
let AnnonceController = class AnnonceController {
    constructor(annonceService) {
        this.annonceService = annonceService;
    }
    findAll() {
        return this.annonceService.findAllAnnonces();
    }
    findAllWithObjects(userId) {
        return this.annonceService.findAllAnnoncesWithObjects(Number(userId));
    }
    async create(body, file) {
        const objectString = body.object;
        console.log(body);
        if (!objectString) {
            throw new Error('Le champ "object" est manquant ou invalide');
        }
        let object;
        try {
            object = JSON.parse(objectString);
        }
        catch (error) {
            throw new Error('Le format du champ "object" est invalide');
        }
        const latitude = parseFloat(body.latitude);
        const longitude = parseFloat(body.longitude);
        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Latitude ou longitude invalide');
        }
        const createAnnonceWithObjectDto = {
            latitude,
            longitude,
            object: {
                ...object,
                imageUrl: file ? `uploads/${file.filename}` : '',
            },
        };
        console.log("DTO reçu:", JSON.stringify(createAnnonceWithObjectDto, null, 2));
        console.log("Fichier reçu:", file ? file.originalname : 'Aucun fichier');
        return this.annonceService.createAnnonceWithObject(createAnnonceWithObjectDto, file);
    }
    findByCategory(categoryId) {
        return this.annonceService.findAnnoncesByCategory(Number(categoryId));
    }
    findOne(id) {
        return this.annonceService.findOneAnnonce(id);
    }
    async remove(id) {
        await this.annonceService.removeAnnonce(id);
        return;
    }
};
exports.AnnonceController = AnnonceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('with-objects'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findAllWithObjects", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnnonceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('by-category'),
    __param(0, (0, common_1.Query)('categoriesId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnnonceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnnonceController.prototype, "remove", null);
exports.AnnonceController = AnnonceController = __decorate([
    (0, swagger_1.ApiTags)('Annonces'),
    (0, common_1.Controller)('annonces'),
    __metadata("design:paramtypes", [annonce_service_1.AnnonceService])
], AnnonceController);
//# sourceMappingURL=annonce.controller.js.map