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
exports.AuthenticationService = void 0;
const UserModel_1 = require("../model/UserModel");
const UserRepo_1 = require("../repository/UserRepo");
const Authentication_1 = __importDefault(require("../utils/Authentication"));
class AuthenticationService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield new UserRepo_1.UserRepo().findByEmail(email);
            if (!users) {
                throw new Error("Bad Request!");
            }
            const compare = yield Authentication_1.default.passwordCompare(password, users.password_hash);
            if (compare) {
                const token = Authentication_1.default.generateToken(users.user_id, users.email, users.name, users.username, users.is_admin);
                return { token, is_admin: users.is_admin };
            }
            return { token: "", is_admin: false };
        });
    }
    register(email, password, name, username, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUserByEmail = yield new UserRepo_1.UserRepo().findByEmail(email);
                if (existingUserByEmail) {
                    throw new Error("E-mail already exist!");
                }
                const existingUserByUsername = yield new UserRepo_1.UserRepo().findByUsername(username);
                if (existingUserByUsername) {
                    throw new Error("Username already exist!");
                }
                const hashedPassword = yield Authentication_1.default.passwordHash(password);
                const new_users = new UserModel_1.User();
                new_users.email = email;
                new_users.password_hash = hashedPassword;
                new_users.username = username;
                new_users.name = name;
                new_users.lastname = lastname;
                new_users.is_admin = false;
                yield new UserRepo_1.UserRepo().save(new_users);
            }
            catch (error) {
                throw new Error("Error login!");
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
