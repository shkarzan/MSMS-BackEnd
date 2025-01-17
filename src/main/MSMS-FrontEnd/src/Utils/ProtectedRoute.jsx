import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
