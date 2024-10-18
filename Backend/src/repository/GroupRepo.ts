import { Group } from "../model/Group";

interface GroupsRepo {
  save(group: Group): Promise<void>;
  update(group: Group): Promise<void>;
  delete(groupId: number): Promise<void>;
  retrieveById(groupId: number): Promise<Group>;
  retrieveAll(): Promise<Group[]>;
  findByAdmin(adminId: number): Promise<Group[]>;
}

class GroupRepo implements GroupsRepo {
  async save(group: Group): Promise<void> {
    try {
      const newGroup = Group.create({
        group_name: group.group_name,
        created_at: new Date(),
      });
      const savedGroup = await newGroup.save();
      if (!savedGroup) {
        throw new Error("Save operation returned undefined");
      }
    } catch (error) {
      throw new Error("Failed to create group! " + error);
    }
  }

  async update(group: Group): Promise<void> {
    try {
      const find_group = await Group.findOneBy({ group_id: group.group_id });
      if (!find_group) {
        throw new Error("Group not found!");
      }
      find_group.group_name = group.group_name;
      find_group.created_at = group.created_at;
      await find_group.save();
    } catch (error) {
      throw new Error("Failed to update group! " + error);
    }
  }

  async delete(groupId: number): Promise<void> {
    try {
      const find_group = await Group.findOneBy({ group_id: groupId });
      if (!find_group) {
        throw new Error("Group not found!");
      }
      await find_group.remove();
    } catch (error) {
      throw new Error("Failed to delete group! " + error);
    }
  }

  async retrieveById(groupId: number): Promise<Group> {
    try {
      const group = await Group.findOne({
        where: { group_id: groupId },
        relations: ["blogs", "memberships"],
      });
      if (!group) {
        throw new Error("Group not found!");
      }
      return group;
    } catch (error) {
      throw new Error("Failed to retrieve group! " + error);
    }
  }

  async retrieveAll(): Promise<Group[]> {
    try {
      return await Group.find({ relations: ["blogs", "memberships"] });
    } catch (error) {
      throw new Error("Failed to retrieve groups! " + error);
    }
  }

  async findByAdmin(adminId: number): Promise<Group[]> {
    try {
      return await Group.createQueryBuilder("group")
        .innerJoin("group.memberships", "membership")
        .where("membership.userUserId = :adminId", { adminId })
        .andWhere("membership.is_admin = true")
        .getMany();
    } catch (error) {
      throw new Error("Failed to retrieve groups! " + error);
    }
  }
}

export default GroupRepo;
