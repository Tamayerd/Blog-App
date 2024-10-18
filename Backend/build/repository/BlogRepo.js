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
class BlogRepo {
    save(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBlog = Blog_1.Blog.create({
                    title: blog.title,
                    content: blog.content,
                    author: blog.author,
                    is_archived: blog.is_archived,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                const savedBlog = yield newBlog.save();
                if (!savedBlog) {
                    throw new Error("Save operation returned undefined");
                }
            }
            catch (error) {
                throw new Error("Failed to create blog!");
            }
        });
    }
    update(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_blog = yield Blog_1.Blog.findOneBy({ blog_id: blog.blog_id });
                if (!find_blog) {
                    throw new Error("Blog not found!");
                }
                find_blog.title = blog.title;
                find_blog.content = blog.content;
                find_blog.is_archived = blog.is_archived;
                find_blog.updated_at = new Date();
                yield find_blog.save();
            }
            catch (error) {
                throw new Error("Failed to update blog!");
            }
        });
    }
    delete(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_blog = yield Blog_1.Blog.findOneBy({ blog_id: blogId });
                if (!find_blog) {
                    throw new Error("Blog not found!");
                }
                yield find_blog.remove();
            }
            catch (error) {
                throw new Error("Failed to delete blog!");
            }
        });
    }
    retrieveById(userId, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog_1.Blog.findOne({
                    where: { blog_id: blogId, author: { user_id: userId } },
                    relations: ["author"],
                });
                console.log(blog);
                if (!blog) {
                    throw new Error("Blog not found!");
                }
                return blog;
            }
            catch (error) {
                throw new Error("Failed to retrieve blog!");
            }
        });
    }
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Blog_1.Blog.find({ relations: ["author", "group"] });
            }
            catch (error) {
                throw new Error("Failed to retrieve blogs! " + error.message);
            }
        });
    }
    retrieveAllWithoutGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Blog_1.Blog.createQueryBuilder("blog")
                    .leftJoinAndSelect("blog.author", "author")
                    .leftJoinAndSelect("blog.group", "group")
                    .where("blog.group IS NULL")
                    .getMany();
            }
            catch (error) {
                throw new Error("Failed to retrieve blogs! " + error.message);
            }
        });
    }
    findByGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Blog_1.Blog.find({
                    where: { group: { group_id: groupId } },
                    relations: ["author", "group"],
                });
            }
            catch (error) {
                throw new Error("Failed to retrieve blogs! " + error);
            }
        });
    }
}
exports.default = BlogRepo;
