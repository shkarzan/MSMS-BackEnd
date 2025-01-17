// components/Sidebar.js
import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import "../Css/Sidebar.css";
// import logo from "../Assets/medical-logo.jpg"; // Ensure you have a logo image in the specified path

const AdminSidebar = ({ logout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo"></div>
      <h2>Medical Store</h2>
      <nav>
        <NavLink to="/dashboard" activeclassname="active">
          Dashboard
        </NavLink>
        <NavLink to="/inventory" activeclassname="active">
          Inventory
        </NavLink>
        <NavLink to="/sales" activeclassname="active">
          Sales
        </NavLink>
        <NavLink to="/customers" activeclassname="active">
          Customers
        </NavLink>
        <NavLink to="/invoices" activeclassname="active">
          Invoices
        </NavLink>
        <NavLink to="/addInvoice" activeclassname="active">
          Add Invoice
        </NavLink>
        <NavLink to="/settings" activeclassname="active">
          Settings
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <p>Admin</p>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
