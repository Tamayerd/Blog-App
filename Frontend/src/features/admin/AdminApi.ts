import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
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
    getAdminGroups: builder.query({
      query: () => ({
        url: "groups/admin-groups",
        method: "GET",
      }),
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blogs/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "blogs/getAll",
        method: "GET",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ blog_id, data }) => ({
        url: `blogs/update/${blog_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blog_id) => ({
        url: `blogs/delete/${blog_id}`,
        method: "DELETE",
      }),
    }),
    getAllGroupMembers: builder.query({
      query: ({ groupId }) => ({
        url: `groups/${groupId}/groupsMember`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAdminGroupsQuery,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllGroupMembersQuery,
} = adminApi;
