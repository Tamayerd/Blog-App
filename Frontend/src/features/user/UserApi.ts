import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  endpoints: (builder) => ({
    getAllGroupBlogs: builder.query({
      query: ({ groupId }) => ({
        url: `groups/group/${groupId}/blogs`,
        method: "GET",
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "blogs/getAll",
        method: "GET",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blog_id) => ({
        url: `blogs/delete/${blog_id}`,
        method: "DELETE",
      }),
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blogs/create",
        method: "POST",
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ blog_id, data }) => ({
        url: `blogs/update/${blog_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllGroupBlogsQuery,
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = userApi;
