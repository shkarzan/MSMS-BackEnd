// components/Invoice.js
import React, { useEffect, useState } from "react";
import "../Css/Invoice.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import generateInvoice from "../Utils/generateInvoice";
import InvoiceTable from "./InvoiceTable";

const AddInvoice = () => {
  const [itemCode, setItemCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [isRight, setIsRight] = useState(true);
  const [testQuantites, setTestQuantities] = useState([]);
  let maxQuantities = [];
  const [testTotals, setTestTotals] = useState([]);
  const [cId, setCId] = useState("");
  const [medList, setMedList] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [invoiceData, setInvoiceData] = useState({
    subTotal: 0,
    taxRate: 0,
    discountRate: 0,
    taxAmount: 0,
    discountAmount: 0,
    total: 0,
  });

  const searchCustomer = async () => {
    await axios
      .get(`/api/customer/get/${cId}`)
      .then((res) => {
        console.log(res.data);
        setCustomer({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage);
        setCustomer({
          name: "",
          phone: "",
          email: "",
        });
      });
  };

  const handleInvoiceDataChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleGenInvoice = async () => {
    if (
      invoiceData.subTotal === 0 ||
      invoiceData.total === 0 ||
      customer.name === "" ||
      customer.email === ""
    ) {
      NotificationManager.error("Invalid Data cannot generate invoice");
    } else {
      await axios
        .post(`/api/sales/add`, invoiceData)
        .then((res) => {
          generateInvoice(
            medList,
            systemData,
            customer,
            testQuantites,
            testTotals,
            date,
            invoiceData,
            cId,
            res.data.salesId
          );
          NotificationManager.success("Sales Added");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const today = new Date();
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(today);

  const [systemData, setSystemDetails] = useState({
    companyName: "",
    email: "",
    phoneNumber: 0,
    address: "",
  });

  const loadSystemData = async () => {
    await axios
      .get(`/api/system/get`)
      .then((res) => {
        setSystemDetails({
          companyName: res.data[0].companyName,
          email: res.data[0].email,
          address: res.data[0].address,
          phoneNumber: res.data[0].phoneNumber,
        });
      })
      .catch((err) => {
        NotificationManager.error(err.data.response.errorMessage);
      });
  };

  useEffect(() => {
    loadSystemData();
  }, []);

  const searchItemCode = async () => {
    await axios
      .get(`/api/medicine/${itemCode}`)
      .then((res) => {
        const i = medList.filter((i) => {
          return i.medCode.toLowerCase() === res.data.medCode.toLowerCase();
        });
        if (i.length > 0) {
          NotificationManager.info("Already Exist");
        } else {
          setMedList([...medList, res.data]);
          maxQuantities.push(res.data.quantity);
        }
        setItemCode("");
      })
      .catch((err) => {
        if (err.message == "Network Error") {
          NotificationManager.error(err.message);
        } else {
          console.log(err.message);
        }
      });
  };

  const removeMed = (medCode, index) => {
    setMedList(medList.filter((i) => i.medCode !== medCode));
    setTestQuantities(testQuantites.filter((_i, idx) => idx !== index));
    setTestTotals(testTotals.filter((_i, idx) => idx !== index));
  };

  const onDone = () => {
    if (isRight) {
      let sum = 0;
      testTotals.forEach((val) => {
        sum += val;
      });
      setInvoiceData({ ...invoiceData, subTotal: sum });
      setIsRight(true);
    }
  };

  const calTotal = () => {
    if (medList.length > 0) {
      setFormValid(true);
    }
    setInvoiceData({
      ...invoiceData,
      taxAmount: (invoiceData.taxRate / 100) * invoiceData.subTotal,
      discountAmount: (invoiceData.discountRate / 100) * invoiceData.subTotal,
      total:
        invoiceData.subTotal +
        invoiceData.taxAmount -
        invoiceData.discountAmount,
    });
  };

  return (
    <div className="invoice-container">
      <h1>Invoice</h1>
      {/* Customer Information */}
      <section className="customer-info">
        <h3>
          <input
            type="text"
            placeholder="Customer ID"
            className="input-field"
            value={cId}
            onChange={(e) => setCId(e.target.value)}
          />
          <input
            type="submit"
            value="Search"
            disabled={cId === "" ? true : false}
            onClick={searchCustomer}
          />
        </h3>

        <h3>Bill To:</h3>
        <input
          type="text"
          readOnly
          value={customer.name}
          placeholder="Customer Name"
          className="input-field"
        />
        <input
          type="text"
          readOnly
          value={customer.phone}
          placeholder="Customer Phone Number"
          className="input-field"
        />
        <input
          type="email"
          placeholder="Customer Email"
          readOnly
          value={customer.email}
          className="input-field"
        />
      </section>

      {/* Invoice Details */}
      <section className="invoice-details">
        <div className="invoice-header">
          <input
            value={date}
            className="input-field"
            placeholder="Invoice Date"
            readOnly
          />
          <input
            type="text"
            placeholder="Item Code"
            className="input-field"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
          />
          <input
            type="submit"
            value="Search"
            disabled={itemCode === "" ? true : false}
            onClick={searchItemCode}
          />
        </div>
        <InvoiceTable
          medList={medList}
          totals={testTotals}
          quantities={testQuantites}
          setTotals={setTestTotals}
          setQuantities={setTestQuantities}
          removeMed={removeMed}
          setIsRight={setIsRight}
        />
        <p>{!isRight && "Quantity choosen is not available"}</p>
        <button hidden={!isRight} onClick={onDone}>
          Done
        </button>
      </section>

      {/* Summary Section */}
      <section className="summary">
        <div className="summary-field">
          <label>Subtotal:</label>
          <input
            type="text"
            name="subTotal"
            value={medList.length === 0 ? 0 : invoiceData.subTotal}
            readOnly
          />
        </div>
        <div className="summary-field">
          <label>Tax Rate (%):</label>
          <input
            type="number"
            name="taxRate"
            value={invoiceData.taxRate}
            onChange={(e) => handleInvoiceDataChange(e)}
          />
        </div>
        <div className="summary-field">
          <label>Discount Rate (%):</label>
          <input
            type="number"
            name="discountRate"
            value={invoiceData.discountRate}
            onChange={(e) => handleInvoiceDataChange(e)}
          />
        </div>
        <div className="summary-field">
          <label>Tax Amount:</label>
          <input
            type="text"
            value={invoiceData.taxAmount.toFixed(2)}
            readOnly
          />
        </div>
        <div className="summary-field">
          <label>Discount Amount:</label>
          <input
            type="text"
            value={invoiceData.discountAmount.toFixed(2)}
            readOnly
          />
        </div>
        <div className="summary-field total">
          <label>Total:</label>
          <input type="text" value={invoiceData.total.toFixed(2)} readOnly />
        </div>
        <button onClick={calTotal}>Calculate</button>
      </section>

      <button
        type="button"
        onClick={handleGenInvoice}
        className="submit-button"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default AddInvoice;
