// components/Dashboard.js
import React from "react";
import "../Css/Dashboard.css";
import StaffSidebar from "./StaffSidebar";
import { Outlet } from "react-router-dom";

const StaffDashboard = ({ logout, isAdmin }) => {
  return (
    <div className="dashboard">
      <StaffSidebar logout={logout} isAdmin={isAdmin} />
      <Outlet />
    </div>
  );
};

export default StaffDashboard;
