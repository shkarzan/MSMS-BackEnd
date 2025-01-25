// components/Dashboard.js
import React from "react";
import "../Css/Dashboard.css";
import StaffSidebar from "./StaffSidebar";
import { Outlet } from "react-router-dom";

const StaffDashboard = ({ logout, isAdmin,count }) => {
  return (
    <div className="dashboard">
      <StaffSidebar logout={logout} isAdmin={isAdmin} count={count} />
      <Outlet />
    </div>
  );
};

export default StaffDashboard;
