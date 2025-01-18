import React, { useState } from "react";
import "../Css/UpdateMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export default function SendEmailManually() {
  const url = "http://localhost:8080/api/invoice";
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    salesId: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data.email);
    await axios
      .post(`${url}/sendEmailBySalesId/${data.salesId}`, formData)
      .then((res) => {
        NotificationManager.succes(res.data);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)} className="enhanced-form">
        <h2 className="form-heading">Manual Pdf Sender</h2>
        <label>
          Enter sales id:
          <input
            type="text"
            name="salesId"
            value={data.salesId}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </label>
        <label>
          Enter email
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Send
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
