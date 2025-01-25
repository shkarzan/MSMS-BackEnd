import React, { useEffect, useState } from "react";
import "../Css/Sales.css";
import Sidebar from "./StaffSidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
// import { NotificationManager } from "react-notifications";

const Customers = () => {
  const url = "http://localhost:8080/api/customer";
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

  const saveCustomer = async (e) => {
    e.preventDefault();
    await axios
      .post(`${url}/add`, customer)
      .then((res) => {
        setAddCustomerOn(!addCustomerOn);
        NotificationManager.success("Customer Added");
        loadCustomers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toString().includes(searchTerm);
  });
  return (
    <div className="sales">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
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
        <button>Update Customer</button>
      </div>
      {addCustomerOn && (
        <form onSubmit={(e) => saveCustomer(e)}>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            onChange={(e) => handleCustomerChange(e)}
          />
          <label>Phone : </label>
          <input
            type="text"
            name="phone"
            onChange={(e) => handleCustomerChange(e)}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => handleCustomerChange(e)}
          />
          <input style={{ margin: "10px" }} type="submit" value="Add" />
        </form>
      )}
      <CommonTable
        tableHeader={["Customer ID", "Name", "Contact", "Email", "Action"]}
        aob={filteredCustomers}
        removeFun={handleCustomerDelete}
        data={"customer"}
      />
    </div>
  );
};

export default Customers;
