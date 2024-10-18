import { Blog } from "../model/Blog";
import { validate } from "class-validator";
import { BlogDTO } from "../schema/BlogDTO";
import { User } from "../model/UserModel";

class BlogService {
  async createBlogFromDTO(blogDTO: BlogDTO, user: User): Promise<Blog> {
    const errors = await validate(blogDTO);
    if (errors.length > 0) {
      throw new Error("Validation failed");
    }

    const blog = new Blog();
    blog.title = blogDTO.title;
    blog.content = blogDTO.content;
    blog.author = user;
    blog.is_archived = blogDTO.is_archived;
    blog.created_at = blogDTO.created_at;
    blog.updated_at = blogDTO.updated_at;

    if (blogDTO.group) {
      blog.group = blogDTO.group;
    }
    return blog;
  }

  async updateBlogFromDTO(blog: Blog, blogDTO: BlogDTO): Promise<Blog> {
    const errors = await validate(blogDTO);
    if (errors.length > 0) {
      console.log("Validation failed: ", errors);
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }

    blog.title = blogDTO.title;
    blog.content = blogDTO.content;
    blog.is_archived = blogDTO.is_archived;
    blog.updated_at = blogDTO.updated_at;

    return blog;
  }
}

export default new BlogService();
