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
const typeorm_1 = require("typeorm");
const UserModel_1 = require("../model/UserModel");
const Group_1 = require("../model/Group");
const GroupMember_1 = require("../model/GroupMember");
const dotenv_1 = __importDefault(require("dotenv"));
const Blog_1 = require("../model/Blog");
const Comment_1 = require("../model/Comment");
const Like_1 = require("../model/Like");
dotenv_1.default.config();
class Database {
    constructor() {
        this.DB_DATABASE = process.env.DB_DATABASE;
        this.DB_HOST = process.env.DB_HOST;
        this.DB_PORT = process.env.DB_PORT;
        this.DB_USERNAME = process.env.DB_USERNAME;
        this.DB_PASSWORD = process.env.DB_PASSWORD;
        this.appDataSource = new typeorm_1.DataSource({
            type: "postgres",
            host: this.DB_HOST,
            port: Number(this.DB_PORT),
            username: this.DB_USERNAME,
            password: this.DB_PASSWORD,
            database: this.DB_DATABASE,
            synchronize: true,
            logging: false,
            entities: [UserModel_1.User, Group_1.Group, GroupMember_1.GroupMember, Blog_1.Blog, Comment_1.Comment, Like_1.Like],
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.appDataSource.initialize();
                console.log("PostgreSQL connection has been established successfully.");
            }
            catch (err) {
                console.log("Unable to connect to the PostgreSQL database.", err);
            }
        });
    }
}
exports.default = Database;
