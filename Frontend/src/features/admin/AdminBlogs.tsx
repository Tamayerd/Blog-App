import React from "react";
import { useGetAllBlogsQuery } from "./AdminApi";
import truncateContent from "../../helpers/Helpers";
import { Blog } from "../../types/Type";
import { useBlogManagement } from "../../hooks/admin/blogManagmentHooks";

const BlogManagement: React.FC = () => {
  const { data: blogs = [], refetch } = useGetAllBlogsQuery({});
  const {
    selectedBlog,
    isCreating,
    handleEdit,
    handleCreate,
    handleSave,
    handleDelete,
  } = useBlogManagement(refetch);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center mt-6">
          <h1 className="text-xl font-bold">Blog Management</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded-full"
          >
            +
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
              {blogs.map((blog: Blog) => (
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
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
