import React, { useState } from "react";
import "../Css/AddMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Outlet, useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const navigate = useNavigate();
  const [med, setMed] = useState({
    medCode: "",
    medName: "",
    price: 0,
    quantity: 0,
    expiryDate: "",
  });

  const url = "http://localhost:8080/api/medicine";

  const handleChange = (e) => {
    setMed({ ...med, [e.target.name]: e.target.value });
  };

  const saveMed = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}/add`, med)
      .then(() => {
        NotificationManager.success("Medicine Added Successfully", "", 1000);
      })
      .catch((err) => {
        NotificationManager.error(err);
      });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => saveMed(e)}>
        <h2>Add Medicine Details</h2>
        <div className="form-group">
          <label htmlFor="name">Medicine Code:</label>
          <input
            type="text"
            id="name"
            name="medCode"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Name:</label>
          <input
            type="text"
            name="medName"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Quantity:</label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Price:</label>
          <input
            type="text"
            name="price"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Medicine
        </button>
        <button
          onClick={() => navigate("/inventory")}
          className="submit-button"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
