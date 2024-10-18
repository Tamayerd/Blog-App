"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (adminOnly = false) => {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send("No token!");
        }
        let secretKey = process.env.JWT_SECRET_KEY || "secret";
        const token = req.headers.authorization.split(" ")[1];
        try {
            const credential = jsonwebtoken_1.default.verify(token, secretKey);
            req.user = { userId: credential.userId };
            if (credential) {
                if (adminOnly && !credential.is_admin) {
                    return res.status(403).send("Access denied. Admins only.");
                }
                return next();
            }
            return res.status(401).send("Token invalid");
        }
        catch (err) {
            return res.status(401).send("Token verification failed");
        }
    };
};
exports.default = AuthMiddleware;
