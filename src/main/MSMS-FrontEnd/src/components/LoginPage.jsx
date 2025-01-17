// components/LoginPage.js
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../Css/LoginPage.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const LoginPage = ({ login, setIsAdmin }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const url = "http://localhost:8080/api/user";
  const { username, password } = user;

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}/login`, user)
      .then((res) => {
        // console.log(res);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        const sessionData = JSON.parse(sessionStorage.getItem("user"));
        if (sessionData.authentication === -1) {
          NotificationManager.error("Invalid Credentials");
        } else {
          if (sessionData.authentication === 1) {
            login(sessionData.name);
            if (sessionData.level) {
              setIsAdmin(true);
              navigate("/dashboard");
              NotificationManager.success("Logged In Successfully as Admin");
            } else {
              setIsAdmin(false);
              navigate("/inventory");
              NotificationManager.success("Logged In Successfully");
            }
          }
        }
      })
      .catch((err) => {
        NotificationManager.error("Error : " + err.message);
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            autoComplete="false"
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <a
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
