import { Blog } from "../model/Blog";

interface BlogsRepo {
  save(blog: Blog): Promise<void>;
  update(blog: Blog): Promise<void>;
  delete(blogId: number): Promise<void>;
  retrieveById(userId: number, blogId: number): Promise<Blog>;
  retrieveAll(): Promise<Blog[]>;
  findByGroup(groupId: number): Promise<Blog[]>;
  retrieveAllWithoutGroup(): Promise<Blog[]>;
}

class BlogRepo implements BlogsRepo {
  async save(blog: Blog): Promise<void> {
    try {
      const newBlog = Blog.create({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        is_archived: blog.is_archived,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const savedBlog = await newBlog.save();
      if (!savedBlog) {
        throw new Error("Save operation returned undefined");
      }
    } catch (error) {
      throw new Error("Failed to create blog!");
    }
  }

  async update(blog: Blog): Promise<void> {
    try {
      const find_blog = await Blog.findOneBy({ blog_id: blog.blog_id });
      if (!find_blog) {
        throw new Error("Blog not found!");
      }
      find_blog.title = blog.title;
      find_blog.content = blog.content;
      find_blog.is_archived = blog.is_archived;
      find_blog.updated_at = new Date();
      await find_blog.save();
    } catch (error) {
      throw new Error("Failed to update blog!");
    }
  }

  async delete(blogId: number): Promise<void> {
    try {
      const find_blog = await Blog.findOneBy({ blog_id: blogId });
      if (!find_blog) {
        throw new Error("Blog not found!");
      }
      await find_blog.remove();
    } catch (error) {
      throw new Error("Failed to delete blog!");
    }
  }

  async retrieveById(userId: number, blogId: number): Promise<Blog> {
    try {
      const blog = await Blog.findOne({
        where: { blog_id: blogId, author: { user_id: userId } },
        relations: ["author"],
      });
      console.log(blog);
      if (!blog) {
        throw new Error("Blog not found!");
      }
      return blog;
    } catch (error) {
      throw new Error("Failed to retrieve blog!");
    }
  }

  async retrieveAll(): Promise<Blog[]> {
    try {
      return await Blog.find({ relations: ["author", "group"] });
    } catch (error) {
      throw new Error("Failed to retrieve blogs! " + (error as Error).message);
    }
  }
  async retrieveAllWithoutGroup(): Promise<Blog[]> {
    try {
      return await Blog.createQueryBuilder("blog")
        .leftJoinAndSelect("blog.author", "author")
        .leftJoinAndSelect("blog.group", "group")
        .where("blog.group IS NULL")
        .getMany();
    } catch (error) {
      throw new Error("Failed to retrieve blogs! " + (error as Error).message);
    }
  }

  async findByGroup(groupId: number): Promise<Blog[]> {
    try {
      return await Blog.find({
        where: { group: { group_id: groupId } },
        relations: ["author", "group"],
      });
    } catch (error) {
      throw new Error("Failed to retrieve blogs! " + error);
    }
  }
}
export default BlogRepo;
