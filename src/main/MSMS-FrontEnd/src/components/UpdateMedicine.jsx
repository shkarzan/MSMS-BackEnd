import React, { useState } from "react";
import "../Css/UpdateMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export default function UpdateMedicine() {
  const url = "/api/medicine";
  const navigate = useNavigate();
  const [med, setMedData] = useState({
    medCode: "",
    medName: "",
    quantity: 0,
    price: 0,
    expiryDate: "",
  });

  const [found, setFound] = useState(false);

  const handleChange = (e) => {
    setMedData({
      ...med,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    await axios
      .get(`${url}/${med.medCode}`)
      .then((res) => {
        // console.log(res.data);
        setMedData(res.data);
        setFound(true);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage, "", 1000);
        setMedData({
          medName: "",
          quantity: 0,
          price: 0,
          expiryDate: "",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${url}/update/${med.medCode}`, med)
      .then(() => {
        NotificationManager.success("Updated Successfully");
        setMedData({
          medCode: "",
          medName: "",
          quantity: 0,
          price: 0,
          expiryDate: "",
        });
        setFound(false);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/inventory");
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)} className="enhanced-form">
        <h2 className="form-heading">Update Form</h2>
        <label>
          Medicine Code
          <input
            type="text"
            name="medCode"
            value={med.medCode}
            onChange={handleChange}
            disabled={found}
          />
        </label>
        <button type="button" onClick={handleSearch} className="search-button">
          Search
        </button>
        <label>
          Medicine Name
          <input
            type="text"
            name="medName"
            value={med.medName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            value={med.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price
          <input
            type="text"
            name="price"
            value={med.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Expiry Date
          <input
            type="text"
            name="expiryDate"
            value={med.expiryDate}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Update
        </button>
        <button
          className="submit-button"
          onClick={() => navigate("/inventory")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
