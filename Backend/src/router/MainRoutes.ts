import { Application } from "express";
import AuthRoutes from "./Auth/AuthRoutes";
import UserRouter from "./AppRoutes/UserRouter";
import BlogRoutes from "./AppRoutes/BlogRoutes";
import AuthMiddleware from "../middleware/AuthMiddleware";
import GroupRoute from "./AppRoutes/GroupRoute";

class Routes {
  public static initialize(app: Application): void {
    app.route("/").get(AuthMiddleware(), (req, res) => {
      res.send("welcome home");
    });

    app.use("/api/v1/auth", AuthRoutes);
    app.use("/api/v1/user", UserRouter);
    app.use("/api/v1/blogs", BlogRoutes);
    app.use("/api/v1/groups", GroupRoute);
  }
}

export default Routes;
