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
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const GroupMember_1 = require("./GroupMember");
const Blog_1 = require("./Blog");
const UserModel_1 = require("./UserModel");
let Group = class Group extends typeorm_1.BaseEntity {
};
exports.Group = Group;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Group.prototype, "group_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Group.prototype, "group_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserModel_1.User, (user) => user.created_groups),
    __metadata("design:type", UserModel_1.User)
], Group.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Group.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Blog_1.Blog, (blog) => blog.group),
    __metadata("design:type", Array)
], Group.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GroupMember_1.GroupMember, (membership) => membership.group),
    __metadata("design:type", Array)
], Group.prototype, "memberships", void 0);
exports.Group = Group = __decorate([
    (0, typeorm_1.Entity)()
], Group);
