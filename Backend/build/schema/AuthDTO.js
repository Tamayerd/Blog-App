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
exports.AuthorDTO = void 0;
const class_validator_1 = require("class-validator");
class AuthorDTO {
}
exports.AuthorDTO = AuthorDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Author ID is required" }),
    __metadata("design:type", Number)
], AuthorDTO.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Username must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Username is required" }),
    __metadata("design:type", String)
], AuthorDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Name must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Name is required" }),
    __metadata("design:type", String)
], AuthorDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Lastname must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Lastname is required" }),
    __metadata("design:type", String)
], AuthorDTO.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Email must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    __metadata("design:type", String)
], AuthorDTO.prototype, "email", void 0);
