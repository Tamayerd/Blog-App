import { Request, Response, NextFunction } from "express";
import BlogService from "../service/BlogService";
import { BlogDTO } from "../schema/BlogDTO";
import BlogRepo from "../repository/BlogRepo";
import Authentication from "../utils/Authentication"; 

class BlogController {
  public async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, content } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const blogDTO = new BlogDTO();
      blogDTO.title = title;
      blogDTO.content = content;
      blogDTO.author = {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      };
      blogDTO.is_archived = false;
      blogDTO.created_at = new Date();
      blogDTO.updated_at = new Date();

      const blog = await BlogService.createBlogFromDTO(blogDTO, user);
      await blog.save();

      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog", error });
    }
    next();
  }

  public async updateBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, content, is_archived } = req.body;
      const user = await Authentication.authenticateUser(req, res);

      const blog_id = parseInt(req.params["blogId"]);
      const blog = await new BlogRepo().retrieveById(user.user_id, blog_id);

      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }

      if (!blog.author || blog.author.user_id !== user.user_id) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }

      const blogDTO = new BlogDTO();
      blogDTO.title = title;
      blogDTO.content = content;
      blogDTO.is_archived = is_archived;
      blogDTO.created_at = blog.created_at;
      blogDTO.updated_at = new Date();

      const updatedBlog = await BlogService.updateBlogFromDTO(blog, blogDTO);
      await updatedBlog.save();

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog", error });
    }
    next();
  }

  public async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await Authentication.authenticateUser(req, res);

      const blog_id = parseInt(req.params["blogId"]);
      const blog = await new BlogRepo().retrieveById(user.user_id, blog_id);

      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }

      if (!blog.author || blog.author.user_id !== user.user_id) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }

      await new BlogRepo().delete(blog_id);
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog", error });
    }
    next();
  }

  public async getAllBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const blogs = await new BlogRepo().retrieveAllWithoutGroup();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve blogs", error });
    }
    next();
  }
}

export default new BlogController();
