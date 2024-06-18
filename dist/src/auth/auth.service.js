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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_helper_service_1 = require("../response-helper/response-helper.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, responseHelperService, jwtService) {
        this.prisma = prisma;
        this.responseHelperService = responseHelperService;
        this.jwtService = jwtService;
    }
    async loginUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordMatching = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Incorrect password');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user_id: user.id,
        };
    }
    async registerUser(dto) {
        const userExist = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (userExist) {
            throw new common_1.ForbiddenException('User under this email is already registered');
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        const created = await this.prisma.user.create({
            data: {
                first_name: dto.firstName,
                last_name: dto.lastName,
                email: dto.email,
                password: hash,
            },
        });
        delete created.password;
        const payload = { email: created.email, sub: created.id };
        const token = this.jwtService.sign(payload);
        return this.responseHelperService.returnSuccess({ access_token: token, user_id: created.id });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        response_helper_service_1.ResponseHelperService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map