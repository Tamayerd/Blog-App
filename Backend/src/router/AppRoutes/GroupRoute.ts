import BaseRoutes from "./BaseRouter";
import GroupController from "../../controllers/GroupController";
import AuthMiddleware from "../../middleware/AuthMiddleware";

class GroupRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/:id/create",
      AuthMiddleware(true),
      GroupController.createGroupByAdmin
    );
    this.router.post(
      "/:id/request-to-join",
      AuthMiddleware(),
      GroupController.requestToJoinGroup
    );
    this.router.patch(
      "/:id/approve-or-reject",
      AuthMiddleware(true),
      GroupController.approveOrRejectRequest
    );

    // subscribed or created all groups blogs
    this.router.get(
      "/group/:groupId/blogs",
      AuthMiddleware(),
      GroupController.getGroupBlogs
    );
    //all groups of admin
    this.router.get(
      "/admin-groups",
      AuthMiddleware(true),
      GroupController.getAdminGroups
    );

    //Members of all admin's groups
    this.router.get(
      "/:groupId/groupsMember",
      AuthMiddleware(true),
      GroupController.getAllGroupMembers
    );

    this.router.post(
      "/:groupId/group/create",
      AuthMiddleware(true),
      GroupController.createGroupBlog
    );
    this.router.delete(
      "/:blogId/blog",
      AuthMiddleware(true),
      GroupController.deleteGroupBlogByAdminAndAssitant
    );
  }
}

export default new GroupRoutes().router;
