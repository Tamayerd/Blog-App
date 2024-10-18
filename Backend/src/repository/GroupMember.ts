import { Between } from "typeorm";
import { Group } from "../model/Group";
import { GroupMember } from "../model/GroupMember";

interface GroupMembersRepo {
  save(groupMember: GroupMember): Promise<void>;
  update(groupMember: GroupMember): Promise<void>;
  delete(membershipId: number): Promise<void>;
  retrieveById(membershipId: number): Promise<GroupMember | null>;
  retrieveAll(): Promise<GroupMember[]>;
  findByUserAndGroup(
    userId: number,
    groupId: number
  ): Promise<GroupMember | null>;
  findApprovedByUser(userId: number): Promise<GroupMember[]>;
  findGroupsByUser(userId: number): Promise<Group[]>;
  findMembershipsByUserId(userId: number): Promise<GroupMember[]>;
  getGroupChangeCount(userId: number): Promise<number>;
}

class GroupMemberRepo implements GroupMembersRepo {
  async save(groupMember: GroupMember): Promise<void> {
    try {
      const newGroupMember = GroupMember.create({
        user: groupMember.user,
        group: groupMember.group,
        is_admin: groupMember.is_admin,
        is_assistant_admin: groupMember.is_assistant_admin,
        approved: groupMember.approved,
        created_at: new Date(),
      });
      const savedGroupMember = await newGroupMember.save();
      if (!savedGroupMember) {
        throw new Error("Save operation returned undefined");
      }
    } catch (error) {
      throw new Error(
        "Failed to create group member! " + (error as Error).message
      );
    }
  }

  async update(groupMember: GroupMember): Promise<void> {
    try {
      const findGroupMember = await GroupMember.findOneBy({
        membership_id: groupMember.membership_id,
      });
      if (!findGroupMember) {
        throw new Error("Group member not found!");
      }
      findGroupMember.is_admin = groupMember.is_admin;
      findGroupMember.is_assistant_admin = groupMember.is_assistant_admin;
      findGroupMember.approved = groupMember.approved;
      await findGroupMember.save();
    } catch (error) {
      throw new Error(
        "Failed to update group member! " + (error as Error).message
      );
    }
  }

  async delete(membershipId: number): Promise<void> {
    try {
      const findGroupMember = await GroupMember.findOneBy({
        membership_id: membershipId,
      });
      if (!findGroupMember) {
        throw new Error("Group member not found!");
      }
      await findGroupMember.remove();
    } catch (error) {
      throw new Error(
        "Failed to delete group member! " + (error as Error).message
      );
    }
  }

  async retrieveById(membershipId: number): Promise<GroupMember | null> {
    try {
      const groupMember = await GroupMember.findOne({
        where: { membership_id: membershipId },
        relations: ["user", "group"],
      });
      if (!groupMember) {
        return null;
      }
      return groupMember;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve group member! " + error);
    }
  }

  async retrieveAll(): Promise<GroupMember[]> {
    try {
      return await GroupMember.find({ relations: ["user", "group"] });
    } catch (error) {
      throw new Error(
        "Failed to retrieve group members! " + (error as Error).message
      );
    }
  }
  async isAdmin(userId: number): Promise<boolean> {
    try {
      const membership = await GroupMember.findOne({
        where: { user: { user_id: userId }, is_admin: true },
      });
      return !!membership;
    } catch (error) {
      throw new Error("Failed to check admin status! " + error);
    }
  }

  async findByUserAndGroup(
    userId: number,
    groupId: number
  ): Promise<GroupMember | null> {
    try {
      const groupMember = await GroupMember.findOne({
        where: {
          user: { user_id: userId },
          group: { group_id: groupId },
          approved: true,
        },
        relations: ["user", "group"],
      });
      return groupMember || null;
    } catch (error) {
      throw new Error("Failed to retrieve group member! " + error);
    }
  }

  async findApprovedByUser(userId: number): Promise<GroupMember[]> {
    try {
      return await GroupMember.find({
        where: { user: { user_id: userId }, approved: true },
        relations: ["group"],
      });
    } catch (error) {
      throw new Error("Failed to retrieve group members! " + error);
    }
  }
  async findGroupsByUser(userId: number): Promise<Group[]> {
    try {
      console.log("girdi");
      const memberships = await GroupMember.find({
        where: { user: { user_id: userId }, approved: true },
        relations: ["group"],
      });
      console.log(memberships);

      const groups = memberships.map((membership) => membership.group);
      return groups;
    } catch (error) {
      throw new Error("Failed to retrieve groups for user! " + error);
    }
  }

  async findMembershipsByUserId(userId: number): Promise<GroupMember[]> {
    try {
      const memberships = await GroupMember.find({
        where: { user: { user_id: userId }, approved: true },
        relations: ["group"],
      });
      return memberships;
    } catch (error) {
      console.error("Hata detayı: ", error);
      throw new Error("Failed to retrieve memberships");
    }
  }

  async getGroupChangeCount(userId: number): Promise<number> {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const changes = await GroupMember.find({
        where: {
          user: { user_id: userId },
          created_at: Between(oneMonthAgo, new Date()),
        },
      });

      return changes.length;
    } catch (error) {
      throw new Error("Failed to retrieve group change count! " + error);
    }
  }
}

export default GroupMemberRepo;
