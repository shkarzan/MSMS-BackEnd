import React, { useEffect, useState } from "react";
import "../Css/Sales.css";
import Sidebar from "./StaffSidebar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
import { useNavigate } from "react-router-dom";

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

const Customers = ({ isAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const url = "/api/customer";
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const loadCustomers = async () => {
    await axios
      .get(`${url}/all`)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [addCustomerOn, setAddCustomerOn] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleCustomerDelete = async (customerId) => {
    await axios
      .delete(`${url}/delete/${customerId}`)
      .then((res) => {
        NotificationManager.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    loadCustomers();
  };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const onSubmit = async (customerData, event) => {
    event.preventDefault();
    await axios
      .post(`${url}/add`, customerData)
      .then((res) => {
        setAddCustomerOn(!addCustomerOn);
        NotificationManager.success("Customer Added");
        loadCustomers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toString().includes(searchTerm);
  });
  return (
    <div className="sales">
      <h1>Customers</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={() => setAddCustomerOn(!addCustomerOn)}>
          Add Customer
        </button>
        <button onClick={() => navigate("/updateCustomer")}>
          Update Customer
        </button>
      </div>
      {addCustomerOn && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            {...register("name")}
            onChange={(e) => handleCustomerChange(e)}
          />
          <p>{errors.name?.message}</p>
          <label>Phone : </label>
          <input
            type="text"
            name="phone"
            {...register("phone")}
            onChange={(e) => handleCustomerChange(e)}
          />
          <p>{errors.phone?.message}</p>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            {...register("email")}
            onChange={(e) => handleCustomerChange(e)}
          />
          <p>{errors.email?.message}</p>
          <input style={{ margin: "10px" }} type="submit" value="Add" />
        </form>
      )}
      <CommonTable
        tableHeader={["Customer ID", "Name", "Contact", "Email", "Action"]}
        aob={filteredCustomers}
        removeFun={handleCustomerDelete}
        data={"customer"}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default Customers;
