import React, { useEffect, useState } from "react";
import "../Css/Inventory.css";
import CommonTable from "./CommonTable";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default function OutOfStock() {
  const today = new Date();
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(today);
  // const navigate = useNavigate();
  const url = "http://localhost:8080/api/medicine";
  const url2 = "http://localhost:8080/api/orders";
  const [meds, setMed] = useState([]);
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    await axios
      .get(`${url2}/all`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [placeOrderOn, setPlaceOrderOn] = useState(false);
  const [orderData, setOrderData] = useState({
    medCode: "",
    medName: "",
    quantity: 0,
    supplierName: "",
    date: date,
  });

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

  const handleOrderDataChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrderClick = (name, code) => {
    if (placeOrderOn) {
      setOrderData({
        medCode: "",
        medName: "",
        quantity: "0",
        supplierName: "",
      });
    }
    orderData.medName = name;
    orderData.medCode = code;
    setPlaceOrderOn(!placeOrderOn);
  };

  const loadMeds = async () => {
    await axios
      .get(`${url}/outOfStock`)
      .then((res) => {
        setMed(res.data);
      })
      .catch((err) => {
        NotificationManager.error("Error Message : " + err);
      });
  };

  const saveOrderData = async (e) => {
    e.preventDefault();
    if (orderData.quantity === "0" || orderData.supplierName === "") {
      NotificationManager.error("Invalid order data");
    } else {
      await axios
        .post("http://localhost:8080/api/orders/add", orderData)
        .then((res) => {
          console.log(res.data);
          loadOrders();
          setPlaceOrderOn(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeMed = async (medCode) => {
    await axios
      .delete(`${url}/delete/${medCode}`)
      .then((res) => {
        NotificationManager.success(res.data);
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage);
      });
    loadMeds();
  };

  const filteredMeds = meds.filter(
    (med) => {
      return med.medName.toString().includes(searchTerm);
    }
    // (med) => !orders.some((order) => order.medCode === med.medCode)
  );

  useEffect(() => {
    loadMeds();
    loadSuppliers();
    loadOrders();
  }, []);
  return (
    <div className="inventory-container">
      <div className="inventory">
        <h1>Out of Stock</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Medicine Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {placeOrderOn && (
          <form
            style={{ border: "2px solid", padding: "5px", margin: "10px" }}
            onSubmit={(e) => saveOrderData(e)}
          >
            Medicine Code :
            <input
              style={{ width: "200px", marginLeft: "10px" }}
              type="text"
              name="medCode"
              readOnly
              value={orderData.medCode}
              // onChange={(e) => handleOrderDataChange(e)}
            />
            <br />
            Medicine Name :
            <input
              readOnly
              style={{ width: "200px", margin: "10px" }}
              type="text"
              name="medName"
              value={orderData.medName}
              // onChange={(e) => handleOrderDataChange(e)}
            />
            <br />
            Quantities :
            <input
              type="text"
              style={{ width: "200px", marginLeft: "10px" }}
              name="quantity"
              value={orderData.quantity}
              onChange={(e) => handleOrderDataChange(e)}
            />
            <br />
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
            <br />
            Order Date:
            <input
              type="text"
              style={{ width: "200px", marginLeft: "10px" }}
              name="date"
              value={date}
              readOnly
            />
            <input
              style={{ margin: "10px" }}
              type="submit"
              value="Place Order"
            />
          </form>
        )}
        <CommonTable
          tableHeader={[
            "Medicine Code",
            "Medicine Name",
            "Quantity Left",
            "Price",
            "Expiry Date",
            "Action",
            "Order Placed",
          ]}
          aob={filteredMeds}
          data={"outOfStock"}
          removeFun={handlePlaceOrderClick}
          orders={orders}
        />
      </div>
    </div>
  );
}
