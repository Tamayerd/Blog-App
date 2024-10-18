import React from "react";
import AdminDashboard from "../features/admin/AdminDashboard";
import AdminBlogsManagement from "../features/admin/AdminBlogs";

const Admin: React.FC = () => {
  return (
    <div>
      <AdminDashboard />
      <AdminBlogsManagement/>
    </div>
  );
};

export default Admin;
