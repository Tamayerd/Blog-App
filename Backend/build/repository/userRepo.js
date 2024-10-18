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
exports.UserRepo = void 0;
const UserModel_1 = require("../model/UserModel");
class UserRepo {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = UserModel_1.User.create({
                    username: user.username,
                    email: user.email,
                    lastname: user.lastname,
                    name: user.name,
                    password_hash: user.password_hash,
                    created_at: new Date(),
                });
                const savedUser = yield newUser.save();
                if (!savedUser) {
                    throw new Error("Save operation returned undefined");
                }
            }
            catch (error) {
                throw new Error("Failed to create user!");
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_user = yield UserModel_1.User.findOneBy({ user_id: user.user_id });
                if (!find_user) {
                    throw new Error("User not found!");
                }
                find_user.username = user.username;
                find_user.password_hash = user.password_hash;
                find_user.email = user.email;
                yield find_user.save();
            }
            catch (error) {
                throw new Error("Failed to update user!");
            }
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_user = yield UserModel_1.User.findOneBy({ user_id: userId });
                if (!find_user) {
                    throw new Error("User not found!");
                }
                yield find_user.remove();
            }
            catch (error) {
                throw new Error("Failed to delete user!");
            }
        });
    }
    retrieveById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_user = yield UserModel_1.User.findOneBy({ user_id: userId });
                if (!find_user) {
                    throw new Error("User not found!");
                }
                return find_user;
            }
            catch (error) {
                throw new Error("Failed to retrieve user!");
            }
        });
    }
    retriveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.User.find();
            }
            catch (error) {
                throw new Error("Failed to retrieve users!");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("findByUsername çalıştı:", email);
                const user = yield UserModel_1.User.findOne({ where: { email } });
                return user;
            }
            catch (error) {
                throw new Error("Failed to fetch data by email! " + error);
            }
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("findByUsername çalıştı:", username);
                const user = yield UserModel_1.User.findOne({ where: { username } });
                console.log("Bulunan kullanıcı:", user);
                if (!user) {
                    return null;
                }
                return user;
            }
            catch (error) {
                throw new Error("Failed to fetch data by username! " + error);
            }
        });
    }
    isAdmin(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield UserModel_1.User.findOne({
                    where: { user_id: userId, is_admin: true },
                });
                return !!admin;
            }
            catch (error) {
                throw new Error("Failed to check admin status! " + error);
            }
        });
    }
}
exports.UserRepo = UserRepo;
