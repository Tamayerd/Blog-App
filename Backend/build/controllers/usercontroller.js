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
const UserModel_1 = require("../model/UserModel");
const UserRepo_1 = require("../repository/UserRepo");
const GroupMember_1 = __importDefault(require("../repository/GroupMember"));
class UserController {
    // async create(req: Request, res: Response) {
    //   try {
    //     const { username, name, lastname, password } = req.body;
    //     const user = new User();
    //     user.username = username;
    //     user.name = name;
    //     user.lastname = lastname;
    //     user.password_hash = password;
    //     console.log("User Object:", user);
    //     await new UserRepo().save(user);
    //     res.status(201).json({
    //       status: "Created!",
    //       message: "Successfully created note!",
    //     });
    //   } catch (error) {
    //     res.status(500).json({
    //       status: "Internal Server Error!",
    //       message: "Internal Server Error!",
    //     });
    //   }
    // }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = parseInt(req.params["id"]);
                yield new UserRepo_1.UserRepo().delete(user_id);
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully deleted note!",
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = parseInt(req.params["id"]);
                const find_users = yield new UserRepo_1.UserRepo().retrieveById(user_id);
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully fetched note by id!",
                    data: find_users,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let all_users = yield new UserRepo_1.UserRepo().retriveAll();
                res.status(200).json({
                    status: "OK!",
                    message: "Successfully fetched all user data!",
                    data: all_users,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = parseInt(req.params["id"]);
                const user = new UserModel_1.User();
                user.user_id = user_id;
                user.username = req.body.username;
                user.password_hash = req.body.password;
                user.name = req.body.name;
                user.lastname = req.body.lastname;
                console.log("Updating User:", user);
                const updatedUser = yield new UserRepo_1.UserRepo().update(user);
                res.status(200).json({
                    status: "OK!",
                    message: `Successfully updated user ${user_id} !`,
                    data: updatedUser,
                });
            }
            catch (error) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    getUserGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = parseInt(req.params["id"]);
                const user = yield new UserRepo_1.UserRepo().retrieveById(user_id);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                const groupMemberRepo = new GroupMember_1.default();
                const groups = yield groupMemberRepo.findGroupsByUser(user_id);
                res.status(200).json(groups);
            }
            catch (error) {
                res.status(500).json({
                    message: "Failed to retrieve groups",
                    error: error.message,
                });
            }
        });
    }
}
exports.default = new UserController();
