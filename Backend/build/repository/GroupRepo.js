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
const Group_1 = require("../model/Group");
class GroupRepo {
    save(group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGroup = Group_1.Group.create({
                    group_name: group.group_name,
                    created_at: new Date(),
                });
                const savedGroup = yield newGroup.save();
                if (!savedGroup) {
                    throw new Error("Save operation returned undefined");
                }
            }
            catch (error) {
                throw new Error("Failed to create group! " + error);
            }
        });
    }
    update(group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_group = yield Group_1.Group.findOneBy({ group_id: group.group_id });
                if (!find_group) {
                    throw new Error("Group not found!");
                }
                find_group.group_name = group.group_name;
                find_group.created_at = group.created_at;
                yield find_group.save();
            }
            catch (error) {
                throw new Error("Failed to update group! " + error);
            }
        });
    }
    delete(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_group = yield Group_1.Group.findOneBy({ group_id: groupId });
                if (!find_group) {
                    throw new Error("Group not found!");
                }
                yield find_group.remove();
            }
            catch (error) {
                throw new Error("Failed to delete group! " + error);
            }
        });
    }
    retrieveById(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield Group_1.Group.findOne({
                    where: { group_id: groupId },
                    relations: ["blogs", "memberships"],
                });
                if (!group) {
                    throw new Error("Group not found!");
                }
                return group;
            }
            catch (error) {
                throw new Error("Failed to retrieve group! " + error);
            }
        });
    }
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Group_1.Group.find({ relations: ["blogs", "memberships"] });
            }
            catch (error) {
                throw new Error("Failed to retrieve groups! " + error);
            }
        });
    }
    findByAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Group_1.Group.createQueryBuilder("group")
                    .innerJoin("group.memberships", "membership")
                    .where("membership.userUserId = :adminId", { adminId })
                    .andWhere("membership.is_admin = true")
                    .getMany();
            }
            catch (error) {
                throw new Error("Failed to retrieve groups! " + error);
            }
        });
    }
}
exports.default = GroupRepo;
