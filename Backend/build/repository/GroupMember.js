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
const typeorm_1 = require("typeorm");
const GroupMember_1 = require("../model/GroupMember");
class GroupMemberRepo {
    save(groupMember) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGroupMember = GroupMember_1.GroupMember.create({
                    user: groupMember.user,
                    group: groupMember.group,
                    is_admin: groupMember.is_admin,
                    is_assistant_admin: groupMember.is_assistant_admin,
                    approved: groupMember.approved,
                    created_at: new Date(),
                });
                const savedGroupMember = yield newGroupMember.save();
                if (!savedGroupMember) {
                    throw new Error("Save operation returned undefined");
                }
            }
            catch (error) {
                throw new Error("Failed to create group member! " + error.message);
            }
        });
    }
    update(groupMember) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findGroupMember = yield GroupMember_1.GroupMember.findOneBy({
                    membership_id: groupMember.membership_id,
                });
                if (!findGroupMember) {
                    throw new Error("Group member not found!");
                }
                findGroupMember.is_admin = groupMember.is_admin;
                findGroupMember.is_assistant_admin = groupMember.is_assistant_admin;
                findGroupMember.approved = groupMember.approved;
                yield findGroupMember.save();
            }
            catch (error) {
                throw new Error("Failed to update group member! " + error.message);
            }
        });
    }
    delete(membershipId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findGroupMember = yield GroupMember_1.GroupMember.findOneBy({
                    membership_id: membershipId,
                });
                if (!findGroupMember) {
                    throw new Error("Group member not found!");
                }
                yield findGroupMember.remove();
            }
            catch (error) {
                throw new Error("Failed to delete group member! " + error.message);
            }
        });
    }
    retrieveById(membershipId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupMember = yield GroupMember_1.GroupMember.findOne({
                    where: { membership_id: membershipId },
                    relations: ["user", "group"],
                });
                if (!groupMember) {
                    return null;
                }
                return groupMember;
            }
            catch (error) {
                console.log(error);
                throw new Error("Failed to retrieve group member! " + error);
            }
        });
    }
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield GroupMember_1.GroupMember.find({ relations: ["user", "group"] });
            }
            catch (error) {
                throw new Error("Failed to retrieve group members! " + error.message);
            }
        });
    }
    isAdmin(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const membership = yield GroupMember_1.GroupMember.findOne({
                    where: { user: { user_id: userId }, is_admin: true },
                });
                return !!membership;
            }
            catch (error) {
                throw new Error("Failed to check admin status! " + error);
            }
        });
    }
    findByUserAndGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupMember = yield GroupMember_1.GroupMember.findOne({
                    where: {
                        user: { user_id: userId },
                        group: { group_id: groupId },
                        approved: true,
                    },
                    relations: ["user", "group"],
                });
                return groupMember || null;
            }
            catch (error) {
                throw new Error("Failed to retrieve group member! " + error);
            }
        });
    }
    findApprovedByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield GroupMember_1.GroupMember.find({
                    where: { user: { user_id: userId }, approved: true },
                    relations: ["group"],
                });
            }
            catch (error) {
                throw new Error("Failed to retrieve group members! " + error);
            }
        });
    }
    findGroupsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("girdi");
                const memberships = yield GroupMember_1.GroupMember.find({
                    where: { user: { user_id: userId }, approved: true },
                    relations: ["group"],
                });
                console.log(memberships);
                const groups = memberships.map((membership) => membership.group);
                return groups;
            }
            catch (error) {
                throw new Error("Failed to retrieve groups for user! " + error);
            }
        });
    }
    findMembershipsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memberships = yield GroupMember_1.GroupMember.find({
                    where: { user: { user_id: userId }, approved: true },
                    relations: ["group"],
                });
                return memberships;
            }
            catch (error) {
                console.error("Hata detayı: ", error);
                throw new Error("Failed to retrieve memberships");
            }
        });
    }
    getGroupChangeCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                const changes = yield GroupMember_1.GroupMember.find({
                    where: {
                        user: { user_id: userId },
                        created_at: (0, typeorm_1.Between)(oneMonthAgo, new Date()),
                    },
                });
                return changes.length;
            }
            catch (error) {
                throw new Error("Failed to retrieve group change count! " + error);
            }
        });
    }
}
exports.default = GroupMemberRepo;
