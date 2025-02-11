import React, { useState } from "react";
import "../Css/UpdateMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export default function UpdateSupplier() {
  const url = "/api/supplier";
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    id: "",
    supplierName: "",
    supplierNumber: "",
    supplierEmail: "",
  });

  const [found, setFound] = useState(false);

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    await axios
      .get(`${url}/${supplier.id}`)
      .then((res) => {
        setSupplier(res.data);
        setFound(true);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage, "", 1000);
        setSupplier({
          id: 0,
          supplierName: "",
          supplierNumber: "",
          supplierEmail: "",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${url}/update/${supplier.id}`, supplier)
      .then(() => {
        NotificationManager.success("Updated Successfully");
        setMedData({
          id: "",
          supplierName: "",
          supplierNumber: "",
          supplierEmail: "",
        });
        setFound(false);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/suppliers");
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)} className="enhanced-form">
        <h2 className="form-heading">Update Form</h2>
        <label>
          Supplier Code
          <input
            type="text"
            name="id"
            value={supplier.id}
            onChange={handleChange}
            disabled={found}
          />
        </label>
        <button type="button" onClick={handleSearch} className="search-button">
          Search
        </button>
        <label>
          Supplier Name
          <input
            type="text"
            name="supplierName"
            value={supplier.supplierName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Supplier Number
          <input
            type="text"
            name="supplierNumber"
            value={supplier.supplierNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Supplier Email
          <input
            type="text"
            name="supplierEmail"
            value={supplier.supplierEmail}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Update
        </button>
        <button
          className="submit-button"
          onClick={() => navigate("/suppliers")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
