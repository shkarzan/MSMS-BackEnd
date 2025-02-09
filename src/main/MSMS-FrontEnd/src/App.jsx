// App.js
import React, { useEffect, useState } from "react";
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
import StaffDashboard from "./components/StaffDashboard";
import Dashboard from "./components/Dashboard";
import SendEmailManually from "./components/SendEmailManually";
import OutOfStock from "./components/OutOfStock";
import axios from "axios";
import Suppliers from "./components/Suppliers";
import AddSupplier from "./components/AddSupplier";
import UpdateSupplier from "./components/UpdateSupplier";
import Orders from "./components/Orders";
import UpdateCustomer from "./components/UpdateCustomer";
import UpdateOrder from "./components/UpdateOrder";

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

  const [count, setCount] = useState(0);
  const getCountOfOutOfStock = async () => {
    await axios
      .get("http://localhost:8080/api/medicine/getCountOfOOS")
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCountOfOutOfStock();
  }, []);
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
                element={
                  <StaffDashboard
                    logout={logout}
                    isAdmin={isAdmin}
                    count={count}
                  />
                }
              >
                <Route path="/addMedicine" element={<AddMedicine />} />
                <Route path="/addSupplier" element={<AddSupplier />} />
                <Route
                  path="/inventory"
                  element={<Inventory isAdmin={isAdmin} />}
                />
                <Route path="/addInvoice" element={<AddInvoice />} />
                <Route path="/sales" element={<Sales isAdmin={isAdmin} />} />
                <Route
                  path="/customers"
                  element={<Customers isAdmin={isAdmin} />}
                />
                <Route
                  path="/suppliers"
                  element={<Suppliers isAdmin={isAdmin} />}
                />
                <Route path="/orders" element={<Orders isAdmin={isAdmin} />} />
                <Route
                  path="/sendManualEmail"
                  element={<SendEmailManually />}
                />
                <Route path="/outOfStock" element={<OutOfStock />} />
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
                element={
                  <StaffDashboard
                    logout={logout}
                    isAdmin={isAdmin}
                    count={count}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/updateMedicine" element={<UpdateMedicine />} />
                <Route path="/updateCustomer" element={<UpdateCustomer />} />
                <Route path="/updateSupplier" element={<UpdateSupplier />} />
                <Route path="/updateOrder" element={<UpdateOrder />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/settings" element={<Settings />} />
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
