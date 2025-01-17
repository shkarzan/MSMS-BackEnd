import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute({ isAdmin, isAuthenticated }) {
  return isAdmin && isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
