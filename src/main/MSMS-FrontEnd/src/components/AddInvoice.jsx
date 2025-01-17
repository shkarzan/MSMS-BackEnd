// components/Invoice.js
import React, { useEffect, useState } from "react";
import "../Css/Invoice.css";
import TableRow from "./TableRow";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import generateInvoice from "../Utils/generateInvoice";

const AddInvoice = () => {
  const url = "http://localhost:8080/api";
  const [itemCode, setItemCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  let salesId = 0;
  let customerId = 0;
  const [invoiceData, setInvoiceData] = useState({
    subTotal: 0,
    taxRate: 0,
    discountRate: 0,
    taxAmount: 0,
    discountAmount: 0,
    total: 0,
  });

  const handleInvoiceDataChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  //Invoice
  const [medList, setMedList] = useState([]);

  // Customer
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const saveCustomer = async () => {
    await axios
      .post(`${url}/customer/add`, customer)
      .then((res) => {
        customerId = res.data.customerId;
        NotificationManager.success("Customer Added");
        console.log(customerId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveSale = async () => {
    await axios
      .post(`${url}/sales/add`, invoiceData)
      .then((res) => {
        salesId = res.data.salesId;
        NotificationManager.success("Sales Added");
        console.log(salesId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isCustomerFormValid = () => {
    if (
      customer.name === "" ||
      customer.phone === "" ||
      customer.email === "" ||
      medList.length === 0 ||
      customer.phone.length > 10
    ) {
      setFormValid(false);
    } else setFormValid(true);
  };

  const handleGenInvoice = () => {
    if (formValid) {
      saveCustomer();
      setTimeout(() => {
        saveSale();
        setTimeout(() => {
          console.log(customerId, salesId);
          generateInvoice(
            medList,
            systemData,
            customer,
            quantities,
            totals,
            date,
            invoiceData,
            customerId,
            salesId
          );
        }, 1000);
      }, 1000);
    } else NotificationManager.error("Invoice Invalid");
  };

  let totals = [];
  let quantities = [];

  const date = new Date()
    .toISOString()
    .split("T")[0]
    .replace("-", "/")
    .replace("-", "/");

  const [systemData, setSystemDetails] = useState({
    companyName: "",
    email: "",
    phoneNumber: 0,
    address: "",
  });

  const loadSystemData = async () => {
    await axios
      .get(`${url}/system/get`)
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
    console.log(medList);
    await axios
      .get(`${url}/medicine/${itemCode}`)
      .then((res) => {
        const i = medList.filter((i) => {
          return i.medCode === res.data.medCode;
        });
        if (i.length > 0) {
          NotificationManager.info("Already Exist");
        } else {
          setMedList([...medList, res.data]);
        }
      })
      .catch((err) => {
        NotificationManager.error(err.response.data.ErrorMessage);
      });
  };

  const removeMed = (medCode) => {
    setMedList(medList.filter((i) => i.medCode !== medCode));
  };

  const onDone = () => {
    let sum = 0;
    totals.forEach((val) => {
      sum += val;
    });
    setInvoiceData({ ...invoiceData, subTotal: sum });
  };

  const calTotal = () => {
    isCustomerFormValid();
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
        <h3>Bill To:</h3>
        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => handleCustomerChange(e)}
          className="input-field"
          name="name"
          required
        />
        <input
          type="text"
          placeholder="Customer Phone Number"
          onChange={(e) => handleCustomerChange(e)}
          className="input-field"
          name="phone"
          required
        />
        <input
          type="email"
          placeholder="Customer Email"
          onChange={(e) => handleCustomerChange(e)}
          className="input-field"
          name="email"
          required
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
            onChange={(e) => setItemCode(e.target.value)}
          />
          <input
            type="submit"
            value="Search"
            disabled={itemCode === "" ? true : false}
            onClick={searchItemCode}
          />
        </div>

        {/* Itemized Table */}
        <table className="item-table">
          <thead>
            <tr>
              <th>Medicine Code</th>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medList.map((i, index) => (
              <TableRow
                key={index}
                index={index}
                code={i.medCode}
                name={i.medName}
                quantity={i.quantity}
                price={i.price}
                removeMed={removeMed}
                totals={totals}
                quantities={quantities}
              />
            ))}
          </tbody>
        </table>
        <button disabled={medList.length === 0 ? true : false} onClick={onDone}>
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
        disabled={!formValid}
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default AddInvoice;
