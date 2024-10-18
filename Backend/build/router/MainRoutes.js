"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRoutes_1 = __importDefault(require("./Auth/AuthRoutes"));
const UserRouter_1 = __importDefault(require("./AppRoutes/UserRouter"));
const BlogRoutes_1 = __importDefault(require("./AppRoutes/BlogRoutes"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const GroupRoute_1 = __importDefault(require("./AppRoutes/GroupRoute"));
class Routes {
    static initialize(app) {
        app.route("/").get((0, AuthMiddleware_1.default)(), (req, res) => {
            res.send("welcome home");
        });
        app.use("/api/v1/auth", AuthRoutes_1.default);
        app.use("/api/v1/user", UserRouter_1.default);
        app.use("/api/v1/blogs", BlogRoutes_1.default);
        app.use("/api/v1/groups", GroupRoute_1.default);
    }
}
exports.default = Routes;
