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
exports.BlogDTO = void 0;
const class_validator_1 = require("class-validator");
const AuthDTO_1 = require("./AuthDTO");
const Group_1 = require("../model/Group");
class BlogDTO {
}
exports.BlogDTO = BlogDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Title is required" }),
    (0, class_validator_1.IsString)({ message: "Title must be a string" }),
    (0, class_validator_1.Length)(1, 255, { message: "Title must be between 1 and 255 characters" }),
    __metadata("design:type", String)
], BlogDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Content is required" }),
    (0, class_validator_1.IsObject)({ message: "Content must be a object" }),
    __metadata("design:type", Object)
], BlogDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: "Archived status must be a boolean" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Archived status is required" }),
    __metadata("design:type", Boolean)
], BlogDTO.prototype, "is_archived", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: "Created date must be a date" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Created date is required" }),
    __metadata("design:type", Date)
], BlogDTO.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: "Updated date must be a date" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Updated date is required" }),
    __metadata("design:type", Date)
], BlogDTO.prototype, "updated_at", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", AuthDTO_1.AuthorDTO)
], BlogDTO.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Group_1.Group)
], BlogDTO.prototype, "group", void 0);
