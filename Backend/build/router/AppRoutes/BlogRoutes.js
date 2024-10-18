"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const BlogController_1 = __importDefault(require("../../controllers/BlogController"));
const AuthMiddleware_1 = __importDefault(require("../../middleware/AuthMiddleware"));
class BlogRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/create", (0, AuthMiddleware_1.default)(), BlogController_1.default.createBlog);
        this.router.patch("/update/:blogId", (0, AuthMiddleware_1.default)(), BlogController_1.default.updateBlog);
        this.router.delete("/delete/:blogId", (0, AuthMiddleware_1.default)(), BlogController_1.default.deleteBlog);
        this.router.get("/getAll", (0, AuthMiddleware_1.default)(), BlogController_1.default.getAllBlogs);
    }
}
exports.default = new BlogRoutes().router;
