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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogService_1 = __importDefault(require("../service/BlogService"));
const BlogDTO_1 = require("../schema/BlogDTO");
const BlogRepo_1 = __importDefault(require("../repository/BlogRepo"));
const Authentication_1 = __importDefault(require("../utils/Authentication"));
class BlogController {
    createBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const blogDTO = new BlogDTO_1.BlogDTO();
                blogDTO.title = title;
                blogDTO.content = content;
                blogDTO.author = {
                    user_id: user.user_id,
                    username: user.username,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                };
                blogDTO.is_archived = false;
                blogDTO.created_at = new Date();
                blogDTO.updated_at = new Date();
                const blog = yield BlogService_1.default.createBlogFromDTO(blogDTO, user);
                yield blog.save();
                res.status(201).json(blog);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create blog", error });
            }
            next();
        });
    }
    updateBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, is_archived } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const blog_id = parseInt(req.params["blogId"]);
                const blog = yield new BlogRepo_1.default().retrieveById(user.user_id, blog_id);
                if (!blog) {
                    res.status(404).json({ message: "Blog not found" });
                    return;
                }
                if (!blog.author || blog.author.user_id !== user.user_id) {
                    res.status(403).json({ message: "Unauthorized" });
                    return;
                }
                const blogDTO = new BlogDTO_1.BlogDTO();
                blogDTO.title = title;
                blogDTO.content = content;
                blogDTO.is_archived = is_archived;
                blogDTO.created_at = blog.created_at;
                blogDTO.updated_at = new Date();
                const updatedBlog = yield BlogService_1.default.updateBlogFromDTO(blog, blogDTO);
                yield updatedBlog.save();
                res.status(200).json(updatedBlog);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to update blog", error });
            }
            next();
        });
    }
    deleteBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const blog_id = parseInt(req.params["blogId"]);
                const blog = yield new BlogRepo_1.default().retrieveById(user.user_id, blog_id);
                if (!blog) {
                    res.status(404).json({ message: "Blog not found" });
                    return;
                }
                if (!blog.author || blog.author.user_id !== user.user_id) {
                    res.status(403).json({ message: "Unauthorized" });
                    return;
                }
                yield new BlogRepo_1.default().delete(blog_id);
                res.status(200).json({ message: "Blog deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete blog", error });
            }
            next();
        });
    }
    getAllBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield new BlogRepo_1.default().retrieveAllWithoutGroup();
                res.status(200).json(blogs);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to retrieve blogs", error });
            }
            next();
        });
    }
}
exports.default = new BlogController();
