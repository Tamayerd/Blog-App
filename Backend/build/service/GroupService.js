"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../model/Blog");
const Group_1 = require("../model/Group");
const GroupMember_1 = require("../model/GroupMember");
class GroupService {
    createGroupFromDTO(groupDTO, user) {
        const group = new Group_1.Group();
        group.group_name = groupDTO.group_name;
        group.created_at = groupDTO.created_at;
        if (groupDTO.blogs) {
            group.blogs = groupDTO.blogs.map((blogDTO) => {
                const blog = new Blog_1.Blog();
                blog.title = blogDTO.title;
                blog.content = blogDTO.content;
                blog.author = user;
                blog.is_archived = blogDTO.is_archived;
                blog.created_at = blogDTO.created_at;
                blog.updated_at = blogDTO.updated_at;
                return blog;
            });
        }
        if (groupDTO.memberships) {
            group.memberships = groupDTO.memberships.map((membershipDTO) => {
                const membership = new GroupMember_1.GroupMember();
                membership.user = user;
                membership.is_admin = membershipDTO.is_admin;
                membership.is_assistant_admin = membershipDTO.is_assistant_admin;
                membership.created_at = membershipDTO.created_at;
                return membership;
            });
        }
        return group;
    }
}
exports.default = new GroupService();
