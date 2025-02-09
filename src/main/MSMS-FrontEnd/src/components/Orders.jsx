import React, { useEffect, useState } from "react";
import "../Css/Sales.css";
import Sidebar from "./StaffSidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import { NotificationManager } from "react-notifications";

const schema = yup.object({
  medName: yup.string().required("Medicine name is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be a positive number")
    .integer("Quantity must not be a decimal valyue")
    .required("Quantity is required"),
});

const Orders = ({ isAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [supplierNames, setSupplierNames] = useState([]);
  const loadSuppliers = async () => {
    await axios
      .get("/api/supplier/allSupplierName")
      .then((res) => {
        setSupplierNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [medNames, setMedNames] = useState([]);

  const loadMedNames = async () => {
    await axios.get("/api/medicine/allMedName").then((res) => {
      setMedNames(res.data);
    });
  };

  const url = "/api/orders";
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
    loadMedNames();
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
        loadOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveNewOrder = async (data, event) => {
    setAddOrderOn(false);
    event.preventDefault();
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

  const changeOrderStatus = async (orderId) => {
    await axios
      .put(`${url}/completed/${orderId}`)
      .then((res) => {
        loadOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateInventory = async (med) => {
    await axios
      .put("/api/medicine/updateInventory/add", med)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const orderReceived = async (orderId, medCode, quantity) => {
    medCode = [medCode];
    quantity = [quantity];
    const med = {
      medCodes: medCode,
      quantities: quantity,
    };
    changeOrderStatus(orderId);
    updateInventory(med);
  };
  const navigate = useNavigate();

  const toUpdateOrderComponent = (supplierNames) => {
    navigate("/updateOrder", { state: { supplierNames: supplierNames } });
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
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={() => setAddOrderOn(!addOrderOn)}>
          Add New Order
        </button>
        <button
          onClick={() => toUpdateOrderComponent(supplierNames)}
          disabled={!isAdmin}
        >
          Update Order
        </button>
      </div>
      {addOrderOn && (
        <form onSubmit={handleSubmit(saveNewOrder)}>
          <label>Med Code</label>
          <input type="text" name="medCode" readOnly value="NA" />
          <label>Name : </label>
          <input
            type="text"
            name="medName"
            {...register("medName")}
            onChange={(e) => handleOrderDataChange(e)}
          />
          <p>{errors.medName?.message}</p>
          <label>Quantity : </label>
          <input
            type="text"
            name="quantity"
            {...register("quantity")}
            onChange={(e) => handleOrderDataChange(e)}
          />
          <p>{errors.quantity?.message}</p>
          Supplier Name:
          <select
            name="supplierName"
            style={{ margin: "10px", width: "200px", padding: "8px" }}
            onChange={(e) => handleOrderDataChange(e)}
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
        medNames={medNames}
        changeOrderStatus={changeOrderStatus}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default Orders;
