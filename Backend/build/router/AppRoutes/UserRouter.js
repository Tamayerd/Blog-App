"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const UserController_1 = __importDefault(require("../../controllers/UserController"));
const Validate_1 = __importDefault(require("../../helper/Validate"));
const UserDTO_1 = __importDefault(require("../../schema/UserDTO"));
class UserRoutes extends BaseRouter_1.default {
    routes() {
        this.router.patch("/:id", (0, Validate_1.default)(UserDTO_1.default), UserController_1.default.update);
        this.router.delete("/:id", UserController_1.default.delete);
        this.router.get("", UserController_1.default.findAll);
        this.router.get("/:id", UserController_1.default.findById);
        this.router.get("/:id/groups", UserController_1.default.getUserGroups);
    }
}
exports.default = new UserRoutes().router;
