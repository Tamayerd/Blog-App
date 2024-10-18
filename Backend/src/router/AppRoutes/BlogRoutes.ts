import BaseRoutes from "./BaseRouter";
import BlogController from "../../controllers/BlogController";
import AuthMiddleware from "../../middleware/AuthMiddleware";

class BlogRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/create", AuthMiddleware(), BlogController.createBlog);
    this.router.patch(
      "/update/:blogId",
      AuthMiddleware(),
      BlogController.updateBlog
    );
    this.router.delete(
      "/delete/:blogId",
      AuthMiddleware(),
      BlogController.deleteBlog
    ); 
    this.router.get(
      "/getAll",
      AuthMiddleware(),
      BlogController.getAllBlogs
    );
 
  }
}

export default new BlogRoutes().router;
