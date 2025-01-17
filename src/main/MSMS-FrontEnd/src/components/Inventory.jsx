// components/Inventory.js
import React, { useEffect, useState } from "react";
import "../Css/Inventory.css";
import Sidebar from "./StaffSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const Inventory = () => {
  const navigate = useNavigate();
  const url = "http://localhost:8080/api/medicine";
  const [meds, setMed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loadMeds = async () => {
    await axios
      .get(`${url}/all`)
      .then((res) => {
        console.log(res.data);
        setMed(res.data);
      })
      .catch((err) => {
        NotificationManager.error("Error Message : " + err);
      });
  };

  const removeMed = async (medCode) => {
    await axios
      .delete(`${url}/delete/${medCode}`)
      .then((res) => {
        NotificationManager.success(res.data);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage);
      });
    loadMeds();
  };
  const filteredMeds = meds.filter((med) =>
    med.medName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    loadMeds();
  }, []);
  return (
    <div className="inventory-container">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <div className="inventory">
        <h1>Inventory</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Medicine Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/addMedicine")}>Add Medicine</button>
          <button onClick={() => navigate("/updateMedicine")}>
            Update Medicine
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Medicine Code</th>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeds.map((med, index) => (
              <tr key={index}>
                <td>{med.medCode}</td>
                <td>{med.medName}</td>
                <td>{med.quantity}</td>
                <td>{med.price}</td>
                <td>{med.expiryDate}</td>
                <td>
                  <button onClick={() => removeMed(med.medCode)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
