"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const validate_1 = __importDefault(require("../helper/validate"));
const userDTO_1 = require("../schema/userDTO");
class UserRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("", (0, validate_1.default)(userDTO_1.UserDto), UserController_1.default.create);
        this.router.patch("/:id", (0, validate_1.default)(userDTO_1.UserDto), UserController_1.default.update);
        this.router.delete("/:id", UserController_1.default.delete);
        this.router.get("", UserController_1.default.findAll);
        this.router.get("/:id", UserController_1.default.findById);
    }
}
exports.default = new UserRoutes().router;
