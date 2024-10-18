import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";

import GroupDTO from "../schema/GroupDTO";

import GroupService from "../service/GroupService";

import { GroupMember } from "../model/GroupMember";
import GroupRepo from "../repository/GroupRepo";
import GroupMemberRepo from "../repository/GroupMember";
import BlogRepo from "../repository/BlogRepo";
import { BlogDTO } from "../schema/BlogDTO";
import BlogService from "../service/BlogService";
import Authentication from "../utils/Authentication";

class GroupController {
  async createGroupByAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await Authentication.authenticateUser(req, res);

      if (!user.is_admin) {
        res.status(403).json({ message: "Only admins can create groups." });
        return;
      }

      const { group_name, blogs, memberships } = req.body;
      const groupDTO = new GroupDTO();
      groupDTO.group_name = group_name;
      groupDTO.created_at = new Date();
      groupDTO.blogs = blogs;
      groupDTO.memberships = memberships;

      const errors = await validate(groupDTO);
      if (errors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors });
        return;
      }

      const group = GroupService.createGroupFromDTO(groupDTO, user);
      await group.save();

      const groupMember = new GroupMember();
      groupMember.user = user;
      groupMember.group = group;
      groupMember.is_admin = true;
      groupMember.is_assistant_admin = false;
      groupMember.approved = true;
      groupMember.created_at = new Date();
      await groupMember.save();

      res.status(201).json(group);
    } catch (error) {
      res.status(500).json({ message: "Failed to create group", error });
    }
    next();
  }

  async requestToJoinGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { groupId } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const group_member_repo = new GroupMemberRepo();
      const user_member = await group_member_repo.findMembershipsByUserId(
        user.user_id
      );

      if (user_member.length >= 1) {
        res.status(400).json({ message: "User can join only one group" });
        return;
      }

      const groupChangeCount = await group_member_repo.getGroupChangeCount(
        user.user_id
      );
      console.log(groupChangeCount);
      if (groupChangeCount >= 2) {
        res
          .status(400)
          .json({ message: "User can only change groups twice in a month" });
        return;
      }

      const group = await new GroupRepo().retrieveById(groupId);
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const groupMember = new GroupMember();
      groupMember.user = user;
      groupMember.group = group;
      groupMember.is_admin = false;
      groupMember.is_assistant_admin = false;
      groupMember.approved = false;
      groupMember.created_at = new Date();

      await groupMember.save();
      res.status(201).json({ message: "Request to join group sent" });
    } catch (error) {
      console.error("Hata detayı: ", error);
      res.status(500).json({ message: "Failed to send request", error: error });
    }
    next();
  }

  async approveOrRejectRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    {
      try {
        const { membershipId, approve } = req.body;
        const groupMemberRepo = new GroupMemberRepo();
        const groupMember = await groupMemberRepo.retrieveById(membershipId);

        if (!groupMember) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        if (approve) {
          groupMember.approved = true;
          await groupMember.save();
          res.status(200).json({ message: "Request approved" });
        } else {
          if (groupMember.is_admin) {
            res.status(403).json({ message: "Cannot remove an admin." });
          } else {
            await groupMember.remove();
            res
              .status(200)
              .json({ message: "Request rejected and membership deleted" });
          }
        }
      } catch (error) {
        res.status(500).json({
          message: "Failed to process request",
          error: (error as Error).message,
        });
      }
    }
    next();
  }

  async createGroupBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { groupId, title, content } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const group = await new GroupRepo().retrieveById(groupId);
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }

      const groupMemberRepo = new GroupMemberRepo();
      const groupMember = await groupMemberRepo.findByUserAndGroup(
        user.user_id,
        groupId
      );

      if (!groupMember || !groupMember.approved) {
        res
          .status(403)
          .json({ message: "Access denied. You cannot create a blog." });
        return;
      }

      const blogDTO = new BlogDTO();
      blogDTO.title = title;
      blogDTO.content = content;
      blogDTO.author = user;
      blogDTO.group = group;
      blogDTO.is_archived = false;
      blogDTO.created_at = new Date();
      blogDTO.updated_at = new Date();

      const blog = await BlogService.createBlogFromDTO(blogDTO, user);

      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({
        message: "Failed to create group blog",
      });
    }
    next();
  }

  async deleteGroupBlogByAdminAndAssitant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { blogId } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const groupMemberRepo = new GroupMemberRepo();
      const groupMember = await groupMemberRepo.findByUserAndGroup(
        user.user_id,
        parseInt(req.params["groupId"])
      );

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

      const blogRepo = new BlogRepo();
      const blog = await blogRepo.retrieveById(user.user_id, blogId);

      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }

      await blogRepo.delete(blogId);
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog", error: error });
    }
    next();
  }

  async deleteGroupMemberByAdminAndAssitant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userIdToRemove } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const groupId = parseInt(req.params["groupId"]);

      const groupMemberRepo = new GroupMemberRepo();
      const adminMember = await groupMemberRepo.findByUserAndGroup(
        user.user_id,
        groupId
      );

      if (
        !adminMember ||
        !adminMember.approved ||
        (!adminMember.is_admin && !adminMember.is_assistant_admin)
      ) {
        res.status(403).json({
          message: "Only admins and assistant admins can remove members.",
        });
        return;
      }

      const memberToRemove = await groupMemberRepo.findByUserAndGroup(
        userIdToRemove,
        groupId
      );

      if (!memberToRemove) {
        res
          .status(404)
          .json({ message: "User to remove not found in the group" });
        return;
      }

      await groupMemberRepo.delete(memberToRemove.membership_id);
      res
        .status(200)
        .json({ message: "User removed from the group successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to remove user from group", error: error });
    }
    next();
  }

  async assignOrRemoveAssistantAdminByAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userIdToUpdate, makeAssistantAdmin } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const groupId = parseInt(req.params["groupId"]);

      const groupMemberRepo = new GroupMemberRepo();
      const adminMember = await groupMemberRepo.findByUserAndGroup(
        user.user_id,
        groupId
      );

      if (!adminMember || !adminMember.approved || !adminMember.is_admin) {
        res.status(403).json({
          message: "Only admins can assign or remove assistant admins.",
        });
        return;
      }

      const memberToUpdate = await groupMemberRepo.findByUserAndGroup(
        userIdToUpdate,
        groupId
      );

      if (!memberToUpdate) {
        res.status(404).json({ message: "User not found in the group" });
        return;
      }

      memberToUpdate.is_assistant_admin = makeAssistantAdmin;
      await memberToUpdate.save();

      res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update user role", error: error });
    }
    next();
  }

  async getGroupBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await Authentication.authenticateUser(req, res);

      const groupId = parseInt(req.params["groupId"]);

      const groupMemberRepo = new GroupMemberRepo();
      const groupMember = await groupMemberRepo.findByUserAndGroup(
        user.user_id,
        groupId
      );
      if (!groupMember || !groupMember.approved) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const blogRepo = new BlogRepo();
      const blogs = await blogRepo.findByGroup(groupId);

      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch blogs",
        error: error,
      });
    }
  }
  async getAdminGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await Authentication.authenticateUser(req, res);

      if (!user.is_admin) {
        res.status(403).json({ message: "Only admins can view their groups." });
        return;
      }

      const groupRepo = new GroupRepo();
      const groups = await groupRepo.findByAdmin(user.user_id);

      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch groups", error: error });
    }
    next();
  }

  async getAllGroupMembers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await Authentication.authenticateUser(req, res);

      const groupId = parseInt(req.params["groupId"]);

      const groupRepo = new GroupRepo();
      const group = await groupRepo.retrieveById(groupId);
      if (!group) {
        res.status(404).json({ message: "Group not found" });
        return;
      }
      const groupMemberRepo = new GroupMemberRepo();
      const groupMember = await groupMemberRepo.findByUserAndGroup(
        user.user_id,
        groupId
      );
      if (!groupMember || !groupMember.approved) {
        res.status(403).json({
          message:
            "Access denied. You are not approved to view the group members.",
        });
        return;
      }
      const members = await groupMemberRepo.retrieveById(groupId);
      console.log(members);
      res.status(200).json(members);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve group members", error: error });
    }
    next();
  }


}

export default new GroupController();
