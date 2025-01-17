import React, { useEffect, useState } from "react";
import "../Css/Sales.css";
import Sidebar from "./StaffSidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
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

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleCustomerDelete = async (customerId) => {
    await axios
      .delete(`${url}/delete/${customerId}`)
      .then((res) => {
        NotificationManager.success(res.data,"",500);
      })
      .catch((err) => {
        console.log(err);
      });
      loadCustomers();
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.customerId.toString().includes(searchTerm);
  });
  return (
    <div className="sales">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <h1>Customers</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Customer id"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index}>
              <th scope="row">{customer.customerId}</th>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>
                <button
                  onClick={() => handleCustomerDelete(customer.customerId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
