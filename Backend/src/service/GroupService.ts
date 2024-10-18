import { Blog } from "../model/Blog";
import { Group } from "../model/Group";
import { GroupMember } from "../model/GroupMember";
import GroupDTO from "../schema/GroupDTO";
import { User } from "../model/UserModel";

class GroupService {
  createGroupFromDTO(groupDTO: GroupDTO, user: User): Group {
    const group = new Group();
    group.group_name = groupDTO.group_name;
    group.created_at = groupDTO.created_at;

    if (groupDTO.blogs) {
      group.blogs = groupDTO.blogs.map((blogDTO) => {
        const blog = new Blog();
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
        const membership = new GroupMember();
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
export default new GroupService();
