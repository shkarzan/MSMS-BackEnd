import React, { useState } from "react";
import "../Css/AddMedicine.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const today = new Date();
const formattedToday = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

const schema = yup.object({
  medCode: yup.string().required("Med Code is required"),
  medName: yup.string().required("Name is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be a integer")
    .required("Quantity is required is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required")
    .test(
      "is-decimal",
      "Price cannot have more than two decimal places",
      (value) => {
        return /^\d+(\.\d{1,2})?$/.test(value); // Allows up to two decimal places
      }
    ),
  expiryDate: yup
    .date()
    .min(formattedToday, "Date cannot be before today's date") // Prevents date before today
    .required("Date is required"),
});

const AddMedicine = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [med, setMed] = useState({
    medCode: location.state === null ? "" : location.state.medCode,
    medName: location.state === null ? "" : location.state.medName,
    price: 0,
    quantity: location.state === null ? "" : location.state.quantity,
    expiryDate: "",
  });

  const url = "/api/medicine";

  const handleChange = (e) => {
    setMed({ ...med, [e.target.name]: e.target.value });
  };

  const onSubmit = async (medData, event) => {
    event.preventDefault();
    medData.expiryDate = med.expiryDate;
    await axios
      .post(`${url}/add`, medData)
      .then(() => {
        NotificationManager.success("Medicine Added Successfully", "", 1000);
      })
      .catch((err) => {
        NotificationManager.error(err);
      });
    navigate("/inventory");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Add Medicine Details</h2>
        <div className="form-group">
          <label>Medicine Code:</label>
          <input
            type="text"
            name="medCode"
            value={med.medCode}
            {...register("medCode")}
            onChange={(e) => handleChange(e)}
          />
          <p>{errors.medCode?.message}</p>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="medName"
            {...register("medName")}
            onChange={(e) => handleChange(e)}
            value={med.medName}
          />
          <p>{errors.medName?.message}</p>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            {...register("quantity")}
            onChange={(e) => handleChange(e)}
            value={med.quantity}
          />
          <p>{errors.quantity?.message}</p>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            {...register("price")}
            onChange={(e) => handleChange(e)}
            value={med.price}
          />
          <p>{errors.price?.message}</p>
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            {...register("expiryDate")}
            onChange={(e) => handleChange(e)}
            value={med.expiryDate}
            min={formattedToday}
          />
          <p>{errors.expiryDate?.message}</p>
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
