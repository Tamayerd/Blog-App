import { useRef, useEffect, useState } from "react";
import {
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCreateBlogMutation,
} from "../../features/admin/AdminApi";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import { Blog } from "../../types/Type";

export const useBlogManagement = (refetch: any) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const editorInstance = useRef<EditorJS | null>(null);
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [createBlog] = useCreateBlogMutation();

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editorInstance.current) return;
    const savedData: OutputData = await editorInstance.current.save();
    const blogData = {
      title: selectedBlog?.title || "New Blog Title",
      content: savedData,
      is_archived: false,
    };

    try {
      if (isCreating) {
        console.log(blogData);
        await createBlog({ data: blogData }).unwrap();
      } else if (selectedBlog) {
        await updateBlog({ blog_id: selectedBlog.blog_id, data: blogData });
      }
      setIsCreating(false);
      setSelectedBlog(null);
      refetch();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (blog_id: number) => {
    try {
      await deleteBlog(blog_id).unwrap();
      console.log("Blog deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  useEffect(() => {
    if (selectedBlog || isCreating) {
      editorInstance.current = new EditorJS({
        holder: "editor-container",
        tools: {
          header: Header,
          list: List,
          table: Table,
        },
        data: selectedBlog ? selectedBlog.content : { blocks: [] },
      });
      return () => {
        if (editorInstance.current) {
          editorInstance.current.destroy();
        }
      };
    }
  }, [selectedBlog, isCreating]);

  return {
    selectedBlog,
    isCreating,
    handleEdit,
    handleCreate,
    handleSave,
    handleDelete,
    editorInstance,
  };
};
