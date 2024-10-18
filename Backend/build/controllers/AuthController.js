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
const Authentication_1 = require("../service/Authentication");
class AuthenticationController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { token, is_admin } = yield new Authentication_1.AuthenticationService().login(email, password);
                if (token === "") {
                    res.status(400).json({
                        status: "Bad Request!",
                        message: "Wrong email or password!",
                    });
                    return;
                }
                const res_token = { type: "Bearer", token: token };
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully logged in!",
                    result: res_token,
                    is_admin: is_admin,
                });
            }
            catch (error) {
                console.error("Error during login:", error);
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal server error occurred!",
                });
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, email, password, lastname } = req.body;
                console.log("girdi");
                yield new Authentication_1.AuthenticationService().register(email, password, name, username, lastname);
                res.status(201).json({
                    status: "Ok!",
                    message: "User registered successfully!",
                });
            }
            catch (error) {
                console.error("Error during registration:", error);
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal server error occurred!",
                });
            }
        });
    }
}
exports.default = AuthenticationController;
