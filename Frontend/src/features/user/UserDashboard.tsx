import React, { useState, useEffect, useRef } from "react";
import {
  useGetAllGroupBlogsQuery,
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "./UserApi";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";

interface Blog {
  blog_id: number;
  title: string;
  content: OutputData;
  created_at: string;
  user_id: number;
}

const UserDashboard: React.FC = () => {
  const { data: myBlogs = [], refetch: refetchMyBlogs } = useGetAllBlogsQuery(
    {}
  );
  const { data: groupBlogs = [] } = useGetAllGroupBlogsQuery({});
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

    if (isCreating) {
      await createBlog({ data: blogData });
      setIsCreating(false);
    } else if (selectedBlog) {
      await updateBlog({ blog_id: selectedBlog.blog_id, data: blogData });
    }

    setSelectedBlog(null);
    refetchMyBlogs();
  };

  const handleDelete = async (blog_id: number) => {
    try {
      await deleteBlog(blog_id).unwrap();
      refetchMyBlogs();
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
        data: selectedBlog ? selectedBlog.content : undefined,
      });

      return () => {
        if (editorInstance.current) {
          editorInstance.current.destroy();
        }
      };
    }
  }, [selectedBlog, isCreating]);

  const truncateContent = (content: OutputData) => {
    return (
      content.blocks
        .filter((block) => "text" in block.data)
        .map((block) => block.data.text)
        .join(" ")
        .substring(0, 10) + "..."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center mt-6">
          <h1 className="text-xl font-bold">My Blogs</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Create Blog
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Blog Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myBlogs.map((blog: Blog) => (
                <tr
                  key={blog.blog_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {blog.title}
                  </th>
                  <td className="px-6 py-4">{truncateContent(blog.content)}</td>
                  <td className="px-6 py-4">{blog.created_at}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.blog_id)}
                      className="ml-4 font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {groupBlogs.map((blog: Blog) => (
                <tr
                  key={blog.blog_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {blog.title} (Group Blog)
                  </th>
                  <td className="px-6 py-4">{truncateContent(blog.content)}</td>
                  <td className="px-6 py-4">{blog.created_at}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-500">No Edit</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(selectedBlog || isCreating) && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            {isCreating ? "Create New Blog" : "Edit Blog"}
          </h2>
          <div id="editor-container" style={{ minHeight: "300px" }}></div>
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
