import React, { useState } from "react";
import "../Css/UpdateMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateOrder() {
  const location = useLocation();
  const supplierNames =
    location.state === null ? "" : location.state.supplierNames;
  const url = "/api/orders";
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    orderId: "",
    medCode: "",
    medName: "",
    quantity: "",
    supplierName: "",
    date: "",
    status: "",
  });

  const [found, setFound] = useState(false);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    console.log(order.orderId);
    await axios
      .get(`${url}/get/${order.orderId}`)
      .then((res) => {
        if (res.data.status === "Completed") {
          NotificationManager.error(
            "Cannot update order with Status :  'Completed'"
          );
        } else {
          setOrder(res.data);
          setFound(true);
        }
      })
      .catch((err) => {
        NotificationManager.error("Order not found");
        setOrder({
          medCode: "",
          medName: "",
          quantity: "",
          supplierName: "",
          date: "",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${url}/update/${order.orderId}`, order)
      .then(() => {
        NotificationManager.success("Updated Successfully");
        navigate("/orders");
        setFound(false);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/orders");
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)} className="enhanced-form">
        <h2 className="form-heading">Update Form</h2>
        <label>
          Order ID
          <input
            type="text"
            name="orderId"
            value={order.orderId}
            onChange={handleChange}
            disabled={found}
          />
        </label>
        <button type="button" onClick={handleSearch} className="search-button">
          Search
        </button>
        <label>
          Med Code
          <input
            type="text"
            name="medCode"
            value={order.medCode}
            disabled={true}
          />
        </label>
        <label>
          Med Name
          <input
            type="text"
            name="medName"
            value={order.medName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity
          <input
            type="text"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            required
          />
        </label>
        Supplier Name
        <select
          name="supplierName"
          style={{
            margin: "10px",
            width: "200px",
            padding: "8px",
          }}
          onChange={handleChange}
          value={order.supplierName}
        >
          <option>Select supplier</option>
          {supplierNames.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </select>
        <label>
          Date
          <input
            type="text"
            name="date"
            disabled={true}
            value={order.date}
            required
          />
        </label>
        <label>
          Status
          <input
            type="text"
            disabled={true}
            name="status"
            value={order.status}
            required
          />
        </label>
        <button type="submit" className="submit-button" disabled={!found}>
          Update
        </button>
        <button className="submit-button" onClick={() => navigate("/orders")}>
          Back
        </button>
      </form>
    </div>
  );
}
