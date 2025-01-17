// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import "./Css/App.css";
import ForgotPassword from "./components/forgotPassword";
import Inventory from "./components/Inventory";
import AddMedicine from "./components/AddMedicine";
import Invoices from "./components/Invoices";
import UpdateMedicine from "./components/UpdateMedicine";
import AddInvoice from "./components/AddInvoice";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Settings from "./components/Settings";
import Sales from "./components/Sales";
import Customers from "./components/Customers";
import AdminRoute from "./Utils/AdminRoute";
import Unauthorized from "./components/Unauthorized";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";
import Dashboard from "./components/Dashboard";

function App() {
  const authenticated =
    sessionStorage.getItem("user") === null
      ? false
      : JSON.parse(sessionStorage.getItem("user")).authentication;
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);
  const admin =
    sessionStorage.getItem("user") === null
      ? false
      : JSON.parse(sessionStorage.getItem("user")).level;

  const [isAdmin, setIsAdmin] = useState(admin);

  const Name =
    sessionStorage.getItem("user") === null
      ? ""
      : JSON.parse(sessionStorage.getItem("user")).name;
  const [name, setName] = useState(Name);
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    <Navigate to="/login" />;
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  login={login}
                  setIsAdmin={setIsAdmin}
                  setName={setName}
                />
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route element={<ProtectedRoute isAuth={isAuthenticated} />}>
              <Route
                element={<StaffDashboard logout={logout} isAdmin={isAdmin} />}
              >
                <Route path="/addMedicine" element={<AddMedicine />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/updateMedicine" element={<UpdateMedicine />} />
                <Route path="/addInvoice" element={<AddInvoice />} />
                <Route path="/sales" element={<Sales />} />
              </Route>
            </Route>
            <Route
              element={
                <AdminRoute
                  isAdmin={isAdmin}
                  isAuthenticated={isAuthenticated}
                />
              }
            >
              <Route
                element={<StaffDashboard logout={logout} isAdmin={isAdmin} />}
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/customers" element={<Customers />} />
              </Route>
            </Route>
          </Routes>
        </div>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
