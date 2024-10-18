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
const class_validator_1 = require("class-validator");
const GroupDTO_1 = __importDefault(require("../schema/GroupDTO"));
const GroupService_1 = __importDefault(require("../service/GroupService"));
const GroupMember_1 = require("../model/GroupMember");
const GroupRepo_1 = __importDefault(require("../repository/GroupRepo"));
const GroupMember_2 = __importDefault(require("../repository/GroupMember"));
const BlogRepo_1 = __importDefault(require("../repository/BlogRepo"));
const BlogDTO_1 = require("../schema/BlogDTO");
const BlogService_1 = __importDefault(require("../service/BlogService"));
const Authentication_1 = __importDefault(require("../utils/Authentication"));
class GroupController {
    createGroupByAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Authentication_1.default.authenticateUser(req, res);
                if (!user.is_admin) {
                    res.status(403).json({ message: "Only admins can create groups." });
                    return;
                }
                const { group_name, blogs, memberships } = req.body;
                const groupDTO = new GroupDTO_1.default();
                groupDTO.group_name = group_name;
                groupDTO.created_at = new Date();
                groupDTO.blogs = blogs;
                groupDTO.memberships = memberships;
                const errors = yield (0, class_validator_1.validate)(groupDTO);
                if (errors.length > 0) {
                    res.status(400).json({ message: "Validation failed", errors });
                    return;
                }
                const group = GroupService_1.default.createGroupFromDTO(groupDTO, user);
                yield group.save();
                const groupMember = new GroupMember_1.GroupMember();
                groupMember.user = user;
                groupMember.group = group;
                groupMember.is_admin = true;
                groupMember.is_assistant_admin = false;
                groupMember.approved = true;
                groupMember.created_at = new Date();
                yield groupMember.save();
                res.status(201).json(group);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create group", error });
            }
            next();
        });
    }
    requestToJoinGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const group_member_repo = new GroupMember_2.default();
                const user_member = yield group_member_repo.findMembershipsByUserId(user.user_id);
                if (user_member.length >= 1) {
                    res.status(400).json({ message: "User can join only one group" });
                    return;
                }
                const groupChangeCount = yield group_member_repo.getGroupChangeCount(user.user_id);
                console.log(groupChangeCount);
                if (groupChangeCount >= 2) {
                    res
                        .status(400)
                        .json({ message: "User can only change groups twice in a month" });
                    return;
                }
                const group = yield new GroupRepo_1.default().retrieveById(groupId);
                if (!group) {
                    res.status(404).json({ message: "Group not found" });
                    return;
                }
                const groupMember = new GroupMember_1.GroupMember();
                groupMember.user = user;
                groupMember.group = group;
                groupMember.is_admin = false;
                groupMember.is_assistant_admin = false;
                groupMember.approved = false;
                groupMember.created_at = new Date();
                yield groupMember.save();
                res.status(201).json({ message: "Request to join group sent" });
            }
            catch (error) {
                console.error("Hata detayı: ", error);
                res.status(500).json({ message: "Failed to send request", error: error });
            }
            next();
        });
    }
    approveOrRejectRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                try {
                    const { membershipId, approve } = req.body;
                    const groupMemberRepo = new GroupMember_2.default();
                    const groupMember = yield groupMemberRepo.retrieveById(membershipId);
                    if (!groupMember) {
                        res.status(404).json({ message: "User not found" });
                        return;
                    }
                    if (approve) {
                        groupMember.approved = true;
                        yield groupMember.save();
                        res.status(200).json({ message: "Request approved" });
                    }
                    else {
                        if (groupMember.is_admin) {
                            res.status(403).json({ message: "Cannot remove an admin." });
                        }
                        else {
                            yield groupMember.remove();
                            res
                                .status(200)
                                .json({ message: "Request rejected and membership deleted" });
                        }
                    }
                }
                catch (error) {
                    res.status(500).json({
                        message: "Failed to process request",
                        error: error.message,
                    });
                }
            }
            next();
        });
    }
    createGroupBlog(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId, title, content } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const group = yield new GroupRepo_1.default().retrieveById(groupId);
                if (!group) {
                    res.status(404).json({ message: "Group not found" });
                    return;
                }
                const groupMemberRepo = new GroupMember_2.default();
                const groupMember = yield groupMemberRepo.findByUserAndGroup(user.user_id, groupId);
                if (!groupMember || !groupMember.approved) {
                    res
                        .status(403)
                        .json({ message: "Access denied. You cannot create a blog." });
                    return;
                }
                const blogDTO = new BlogDTO_1.BlogDTO();
                blogDTO.title = title;
                blogDTO.content = content;
                blogDTO.author = user;
                blogDTO.group = group;
                blogDTO.is_archived = false;
                blogDTO.created_at = new Date();
                blogDTO.updated_at = new Date();
                const blog = yield BlogService_1.default.createBlogFromDTO(blogDTO, user);
                yield blog.save();
                res.status(201).json(blog);
            }
            catch (error) {
                res.status(500).json({
                    message: "Failed to create group blog",
                });
            }
            next();
        });
    }
    deleteGroupBlogByAdminAndAssitant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { blogId } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const groupMemberRepo = new GroupMember_2.default();
                const groupMember = yield groupMemberRepo.findByUserAndGroup(user.user_id, parseInt(req.params["groupId"]));
                if (!groupMember || !groupMember.approved) {
                    res
                        .status(403)
                        .json({ message: "Access denied. You cannot delete this blog." });
                    return;
                }
                if (!groupMember.is_admin && !groupMember.is_assistant_admin) {
                    res.status(403).json({
                        message: "Only admins and assistant admins can delete blogs.",
                    });
                    return;
                }
                const blogRepo = new BlogRepo_1.default();
                const blog = yield blogRepo.retrieveById(user.user_id, blogId);
                if (!blog) {
                    res.status(404).json({ message: "Blog not found" });
                    return;
                }
                yield blogRepo.delete(blogId);
                res.status(200).json({ message: "Blog deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete blog", error: error });
            }
            next();
        });
    }
    deleteGroupMemberByAdminAndAssitant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userIdToRemove } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const groupId = parseInt(req.params["groupId"]);
                const groupMemberRepo = new GroupMember_2.default();
                const adminMember = yield groupMemberRepo.findByUserAndGroup(user.user_id, groupId);
                if (!adminMember ||
                    !adminMember.approved ||
                    (!adminMember.is_admin && !adminMember.is_assistant_admin)) {
                    res.status(403).json({
                        message: "Only admins and assistant admins can remove members.",
                    });
                    return;
                }
                const memberToRemove = yield groupMemberRepo.findByUserAndGroup(userIdToRemove, groupId);
                if (!memberToRemove) {
                    res
                        .status(404)
                        .json({ message: "User to remove not found in the group" });
                    return;
                }
                yield groupMemberRepo.delete(memberToRemove.membership_id);
                res
                    .status(200)
                    .json({ message: "User removed from the group successfully" });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Failed to remove user from group", error: error });
            }
            next();
        });
    }
    assignOrRemoveAssistantAdminByAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userIdToUpdate, makeAssistantAdmin } = req.body;
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const groupId = parseInt(req.params["groupId"]);
                const groupMemberRepo = new GroupMember_2.default();
                const adminMember = yield groupMemberRepo.findByUserAndGroup(user.user_id, groupId);
                if (!adminMember || !adminMember.approved || !adminMember.is_admin) {
                    res.status(403).json({
                        message: "Only admins can assign or remove assistant admins.",
                    });
                    return;
                }
                const memberToUpdate = yield groupMemberRepo.findByUserAndGroup(userIdToUpdate, groupId);
                if (!memberToUpdate) {
                    res.status(404).json({ message: "User not found in the group" });
                    return;
                }
                memberToUpdate.is_assistant_admin = makeAssistantAdmin;
                yield memberToUpdate.save();
                res.status(200).json({ message: "User role updated successfully" });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Failed to update user role", error: error });
            }
            next();
        });
    }
    getGroupBlogs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const groupId = parseInt(req.params["groupId"]);
                const groupMemberRepo = new GroupMember_2.default();
                const groupMember = yield groupMemberRepo.findByUserAndGroup(user.user_id, groupId);
                if (!groupMember || !groupMember.approved) {
                    res.status(403).json({ message: "Access denied" });
                    return;
                }
                const blogRepo = new BlogRepo_1.default();
                const blogs = yield blogRepo.findByGroup(groupId);
                res.status(200).json(blogs);
            }
            catch (error) {
                res.status(500).json({
                    message: "Failed to fetch blogs",
                    error: error,
                });
            }
        });
    }
    getAdminGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Authentication_1.default.authenticateUser(req, res);
                if (!user.is_admin) {
                    res.status(403).json({ message: "Only admins can view their groups." });
                    return;
                }
                const groupRepo = new GroupRepo_1.default();
                const groups = yield groupRepo.findByAdmin(user.user_id);
                res.status(200).json(groups);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to fetch groups", error: error });
            }
            next();
        });
    }
    getAllGroupMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Authentication_1.default.authenticateUser(req, res);
                const groupId = parseInt(req.params["groupId"]);
                const groupRepo = new GroupRepo_1.default();
                const group = yield groupRepo.retrieveById(groupId);
                if (!group) {
                    res.status(404).json({ message: "Group not found" });
                    return;
                }
                const groupMemberRepo = new GroupMember_2.default();
                const groupMember = yield groupMemberRepo.findByUserAndGroup(user.user_id, groupId);
                if (!groupMember || !groupMember.approved) {
                    res.status(403).json({
                        message: "Access denied. You are not approved to view the group members.",
                    });
                    return;
                }
                const members = yield groupMemberRepo.retrieveById(groupId);
                console.log(members);
                res.status(200).json(members);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Failed to retrieve group members", error: error });
            }
            next();
        });
    }
}
exports.default = new GroupController();
