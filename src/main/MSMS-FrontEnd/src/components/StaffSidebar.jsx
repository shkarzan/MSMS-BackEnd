// components/Sidebar.js
import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import "../Css/Sidebar.css";
// import logo from "../Assets/medical-logo.jpg"; // Ensure you have a logo image in the specified path

const StaffSidebar = ({ logout, isAdmin, count }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo"></div>
      <h2>Medical Store</h2>
      <nav>
        <NavLink to="/inventory" activeclassname="active">
          Inventory Management
        </NavLink>
        <NavLink to="/sales" activeclassname="active">
          Sales Management
        </NavLink>
        <NavLink to="/orders" activeclassname="active">
          Orders Management
        </NavLink>
        <NavLink to="/customers" activeclassname="active">
          Customer Management
        </NavLink>
        {isAdmin && (
          <NavLink to="/invoices" activeclassname="active">
            Invoice Management
          </NavLink>
        )}
        <NavLink to="/addInvoice" activeclassname="active">
          Add Invoice
        </NavLink>

        <NavLink to="/suppliers" activeclassname="active">
          Supplier Management
        </NavLink>
        <NavLink to="/sendManualEmail" activeclassname="active">
          Send PDF Manually
        </NavLink>
        <NavLink to="/outOfStock" activeclassname="active">
          Out of Stock-{count}
        </NavLink>
        {isAdmin && (
          <NavLink to="/settings" activeclassname="active">
            System User Management
          </NavLink>
        )}
      </nav>
      <div className="sidebar-footer">
        <p>{isAdmin ? "Admin" : "Staff"}</p>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default StaffSidebar;
