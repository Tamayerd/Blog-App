import BaseRoutes from "./BaseRouter";
import UserController from "../../controllers/UserController";
import validate from "../../helper/Validate";
import UserDto from "../../schema/UserDTO";

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.patch("/:id", validate(UserDto), UserController.update);
    this.router.delete("/:id", UserController.delete);
    this.router.get("", UserController.findAll);
    this.router.get("/:id", UserController.findById);
    this.router.get("/:id/groups", UserController.getUserGroups);
  }
}

export default new UserRoutes().router;
