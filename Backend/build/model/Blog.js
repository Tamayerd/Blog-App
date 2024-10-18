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
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const UserModel_1 = require("./UserModel");
const Like_1 = require("./Like");
const Comment_1 = require("./Comment");
const Group_1 = require("./Group");
let Blog = class Blog extends typeorm_1.BaseEntity {
};
exports.Blog = Blog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Blog.prototype, "blog_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("json"),
    __metadata("design:type", Object)
], Blog.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserModel_1.User, (user) => user.blogs),
    __metadata("design:type", UserModel_1.User)
], Blog.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Group_1.Group, (group) => group.blogs, { nullable: true }),
    __metadata("design:type", Group_1.Group)
], Blog.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Blog.prototype, "is_archived", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Blog.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Blog.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.blog),
    __metadata("design:type", Array)
], Blog.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Like_1.Like, (like) => like.blog),
    __metadata("design:type", Array)
], Blog.prototype, "likes", void 0);
exports.Blog = Blog = __decorate([
    (0, typeorm_1.Entity)()
], Blog);
