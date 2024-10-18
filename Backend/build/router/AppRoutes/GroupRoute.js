"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const GroupController_1 = __importDefault(require("../../controllers/GroupController"));
const AuthMiddleware_1 = __importDefault(require("../../middleware/AuthMiddleware"));
class GroupRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/:id/create", (0, AuthMiddleware_1.default)(true), GroupController_1.default.createGroupByAdmin);
        this.router.post("/:id/request-to-join", (0, AuthMiddleware_1.default)(), GroupController_1.default.requestToJoinGroup);
        this.router.patch("/:id/approve-or-reject", (0, AuthMiddleware_1.default)(true), GroupController_1.default.approveOrRejectRequest);
        //All group blogs
        this.router.get("/group/:groupId/blogs", (0, AuthMiddleware_1.default)(true), GroupController_1.default.getGroupBlogs);
        //All groups
        this.router.get("/admin-groups", (0, AuthMiddleware_1.default)(true), GroupController_1.default.getAdminGroups);
        //Group Members
        this.router.get("/:groupId/groupsMember", (0, AuthMiddleware_1.default)(true), GroupController_1.default.getAllGroupMembers);
        this.router.post("/:groupId/group/create", (0, AuthMiddleware_1.default)(), GroupController_1.default.createGroupBlog);
        this.router.delete("/:blogId/blog", (0, AuthMiddleware_1.default)(true), GroupController_1.default.deleteGroupBlogByAdminAndAssitant);
    }
}
exports.default = new GroupRoutes().router;
