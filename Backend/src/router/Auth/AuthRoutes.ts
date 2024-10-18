import AuthenticationController from "../../controllers/AuthController";
import BaseRoutes from "../AppRoutes/BaseRouter";

class AuthenticationRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/login", AuthenticationController.login);
    this.router.post("/register", AuthenticationController.register);
  }
}

export default new AuthenticationRoutes().router;
