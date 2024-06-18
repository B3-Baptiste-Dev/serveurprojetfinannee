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
exports.RegisterDTO = void 0;
const class_validator_1 = require("class-validator");
class RegisterDTO {
}
exports.RegisterDTO = RegisterDTO;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email should not be empty' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Please enter a valid first name' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name should not be empty' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Please enter a valid last name' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name should not be empty' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Please enter a valid password' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password should be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$&*~]).{8,}$/, { message: 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "password", void 0);
//# sourceMappingURL=register.dto.js.map