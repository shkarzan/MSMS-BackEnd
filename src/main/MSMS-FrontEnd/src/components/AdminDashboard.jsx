// components/Dashboard.js
import React from "react";
import "../Css/Dashboard.css";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = ({ logout }) => {
  return (
    <div className="dashboard">
      <AdminSidebar logout={logout} />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
