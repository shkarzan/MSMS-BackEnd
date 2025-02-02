import React, { useEffect, useState } from "react";
import "../Css/Sales.css";
import Sidebar from "./StaffSidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
// import { NotificationManager } from "react-notifications";

const Orders = () => {
  const [supplierNames, setSupplierNames] = useState([]);

  const loadSuppliers = async () => {
    await axios
      .get("http://localhost:8080/api/supplier/allSupplierName")
      .then((res) => {
        setSupplierNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const url = "http://localhost:8080/api/orders";
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    await axios
      .get(`${url}/all`)
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [addOrderOn, setAddOrderOn] = useState(false);

  useEffect(() => {
    loadOrders();
    loadSuppliers();
  }, []);

  const today = new Date();
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(today);

  const handleOrderDelete = async (orderId) => {
    await axios
      .delete(`${url}/${orderId}`)
      .then((res) => {
        NotificationManager.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    loadOrders();
  };

  const saveNewOrder = async (e) => {
    e.preventDefault();
    console.log(orderData);

    await axios
      .post(`${url}/add`, orderData)
      .then((res) => {
        setAddOrderOn(!addOrderOn);
        console.log(res.data);
        NotificationManager.success("New Order Added");
        loadOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOrderDataChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };
  const [orderData, setOrderData] = useState({
    medCode: "NA",
    medName: "",
    quantity: "",
    supplierName: "",
    date: date,
  });

  const orderReceived = async (orderId, medCode, quantity) => {
    medCode = [medCode];
    quantity = [quantity];
    const med = {
      medCodes: medCode,
      quantities: quantity,
    };
    await axios
      .put(`${url}/completed/${orderId}`)
      .then((res) => {
        console.log(res.data);

        // NotificationManager.success(res.data);
        loadOrders();
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .put("http://localhost:8080/api/medicine/updateInventory/add", med)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredOrders = orders.filter((order) => {
    return order.orderId.toString().includes(searchTerm);
  });
  return (
    <div className="sales">
      <h1>Orders</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Order Date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={() => setAddOrderOn(!addOrderOn)}>
          Add New Order
        </button>
        <button>Update Order</button>
      </div>
      {addOrderOn && (
        <form onSubmit={(e) => saveNewOrder(e)}>
          <label>Med Code</label>
          <input type="text" name="medCode" readOnly value="NA" />
          <label>Name : </label>
          <input
            type="text"
            name="medName"
            onChange={(e) => handleOrderDataChange(e)}
          />
          <label>Quantity : </label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => handleOrderDataChange(e)}
          />
          Supplier Name:
          <select
            name="supplierName"
            style={{ margin: "10px", width: "200px", padding: "8px" }}
            onChange={(e) => handleOrderDataChange(e)}
            // value={orderData.supplierName}
            // defaultValue={"Select supplier"}
          >
            <option>Select supplier</option>
            {supplierNames.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))}
          </select>
          Order Date:
          <input
            type="text"
            style={{ width: "200px", marginLeft: "10px" }}
            name="date"
            value={date}
            readOnly
          />
          <input style={{ margin: "10px" }} type="submit" value="Place Order" />
        </form>
      )}
      <CommonTable
        tableHeader={[
          "Order ID",
          "Med Code",
          "Med Name",
          "Quantity",
          "Supplier Name",
          "Date",
          "Status",
          "Action",
        ]}
        aob={filteredOrders}
        removeFun={handleOrderDelete}
        data={"orders"}
        orderReceived={orderReceived}
      />
    </div>
  );
};

export default Orders;
