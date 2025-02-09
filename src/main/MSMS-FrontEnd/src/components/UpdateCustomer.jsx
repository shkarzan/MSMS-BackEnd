import React, { useState } from "react";
import "../Css/UpdateMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Only letters allowed")
    .required("Name is required"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export default function UpdateCustomer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const url = "/api/customer";
  const navigate = useNavigate();
  const [customer, setCustomerData] = useState({
    customerId: 0,
    name: "",
    email: "",
    phone: 0,
  });

  const [customerID, setCustomerID] = useState("");

  const [found, setFound] = useState(false);

  const handleChange = (e) => {
    setCustomerData({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    await axios
      .get(`${url}/get/${customerID}`)
      .then((res) => {
        setCustomerData(res.data);
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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    await axios
      .put(`${url}/update/${customerID}`, data)
      .then((res) => {
        NotificationManager.success("Customer updated successfully");
        navigate("/customers");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/customers");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="enhanced-form">
        <h2 className="form-heading">Update Form</h2>
        <label>
          Customer ID
          <input
            type="text"
            name="customerID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
            disabled={found}
          />
        </label>
        <button type="button" onClick={handleSearch} className="search-button">
          Search
        </button>
        <label>
          Customer Name
          <input
            type="text"
            name="name"
            value={customer.name}
            {...register("name")}
            onChange={handleChange}
            required
          />
        </label>
        <p>{errors.name?.message}</p>

        <label>
          Customer Email
          <input
            type="email"
            name="email"
            {...register("email")}
            value={customer.email}
            onChange={handleChange}
            required
          />
        </label>
        <p>{errors.email?.message}</p>

        <label>
          Phone
          <input
            type="text"
            name="price"
            value={customer.phone}
            {...register("phone")}
            onChange={handleChange}
            required
          />
        </label>
        <p>{errors.phone?.message}</p>
        <button type="submit" className="submit-button">
          Update
        </button>
        <button
          className="submit-button"
          onClick={() => navigate("/customers")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
