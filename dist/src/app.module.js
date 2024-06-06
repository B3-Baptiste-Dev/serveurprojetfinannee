"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const response_helper_service_1 = require("./response-helper/response-helper.service");
const config_1 = require("@nestjs/config");
const category_module_1 = require("./category/category.module");
const reservation_module_1 = require("./reservation/reservation.module");
const message_module_1 = require("./message/message.module");
const review_module_1 = require("./review/review.module");
const object_module_1 = require("./object/object.module");
const annonce_module_1 = require("./annonce/annonce.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, config_1.ConfigModule.forRoot(), category_module_1.CategoryModule, reservation_module_1.ReservationModule, message_module_1.MessageModule, review_module_1.ReviewModule, object_module_1.ObjectModule, annonce_module_1.AnnonceModule, user_module_1.UserModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, response_helper_service_1.ResponseHelperService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map