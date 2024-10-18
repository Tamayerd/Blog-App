"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../model/Blog");
const class_validator_1 = require("class-validator");
class BlogService {
    createBlogFromDTO(blogDTO, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(blogDTO);
            if (errors.length > 0) {
                throw new Error("Validation failed");
            }
            const blog = new Blog_1.Blog();
            blog.title = blogDTO.title;
            blog.content = blogDTO.content;
            blog.author = user;
            blog.is_archived = blogDTO.is_archived;
            blog.created_at = blogDTO.created_at;
            blog.updated_at = blogDTO.updated_at;
            if (blogDTO.group) {
                blog.group = blogDTO.group;
            }
            return blog;
        });
    }
    updateBlogFromDTO(blog, blogDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(blogDTO);
            if (errors.length > 0) {
                console.log("Validation failed: ", errors);
                throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
            }
            blog.title = blogDTO.title;
            blog.content = blogDTO.content;
            blog.is_archived = blogDTO.is_archived;
            blog.updated_at = blogDTO.updated_at;
            return blog;
        });
    }
}
exports.default = new BlogService();
