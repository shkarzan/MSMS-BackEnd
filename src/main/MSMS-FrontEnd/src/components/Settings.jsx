import React, { useEffect, useState } from "react";
import "../Css/Settings.css";
import Sidebar from "./StaffSidebar.jsx";
import axios from "axios";
import { NotificationManager } from "react-notifications";

function Settings() {
  const url = "http://localhost:8080/api/user";
  const loadUsers = async () => {
    await axios
      .get(`${url}/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        NotificationManager.error("NetWork Error");
      });
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (username) => {
    await axios
      .delete(`${url}/delete/${username}`)
      .then((res) => {
        NotificationManager.success(res.data, "", 1000);
        loadUsers();
      })
      .catch(() => {
        NotificationManager.error("Error deleting user", "", 1000);
      });
  };

  const [user, setUser] = useState({
    name: "",
    password: "",
    username: "",
  });

  const [addUserOn, setAddUserOn] = useState(false);

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}/register`, user)
      .then((res) => {
        console.log(res);
        NotificationManager.success("User added succesfully");
        loadUsers();
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.response.data);
      });
  };

  return (
    <div className="container">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <header className="header">
        <h1>Admin Page</h1>
        <button
          className="add-user-btn"
          onClick={() => setAddUserOn(!addUserOn)}
        >
          Add User
        </button>
      </header>
      {addUserOn && (
        <form onSubmit={(e) => addUser(e)}>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            onChange={(e) => handleUserChange(e)}
          />
          <label>Username : </label>
          <input
            type="text"
            name="username"
            onChange={(e) => handleUserChange(e)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => handleUserChange(e)}
          />
          <input type="submit" value="Add" />
        </form>
      )}
      <table className="user-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Settings;
