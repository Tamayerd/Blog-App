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
const class_validator_1 = require("class-validator");
class UserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Username is required" }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9]+$/, {
        message: "Username must contain only letters and numbers",
    }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Name must be a string" }),
    (0, class_validator_1.Length)(1, 100, { message: "Name must be between 1 and 100 characters" }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Lastname must be a string" }),
    (0, class_validator_1.Length)(1, 100, { message: "Lastname must be between 1 and 100 characters" }),
    __metadata("design:type", String)
], UserDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Password is required" }),
    (0, class_validator_1.Length)(6, 15, { message: "Password must be at least 6 characters long" }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
exports.default = UserDto;
