import React from "react";

const CommonTable = ({ tableHeader, aob, removeFun, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((th, index) => (
            <th key={index}>{th}</th>
          ))}
          {/* <th>Medicine Code</th>
          <th>Medicine Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Expiry Date</th>
          <th>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        {data == "customer" &&
          aob.map((customer, index) => (
            <tr key={index}>
              <th scope="row">{customer.customerId}</th>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => removeFun(customer.customerId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        {data == "inventory" &&
          aob.map((med, index) => (
            <tr key={index}>
              <td>{med.medCode}</td>
              <td>{med.medName}</td>
              <td>{med.quantity}</td>
              <td>{med.price}</td>
              <td>{med.expiryDate}</td>
              <td>
                <button onClick={() => removeFun(med.salesId)}>Remove</button>
              </td>
            </tr>
          ))}
        {data == "sales" &&
          aob.map((sale, index) => (
            <tr key={index}>
              <td>{sale.salesId}</td>
              <td>{sale.subTotal}</td>
              <td>{sale.taxAmount.toFixed(2)}</td>
              <td>{sale.discountAmount.toFixed(2)}</td>
              <td>{sale.total.toFixed(2)}</td>
              <td>
                <button onClick={() => removeFun(sale.salesId)}>Remove</button>
              </td>
            </tr>
          ))}
        {data == "outOfStock" &&
          aob.map((med, index) => (
            <tr key={index}>
              <td>{med.medCode}</td>
              <td>{med.medName}</td>
              <td>{med.quantity}</td>
              <td>{med.price}</td>
              <td>{med.expiryDate}</td>
              {/* <td
                style={{
                  display: "flex",
                  gap: "7px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={() => removeFun(med.medCode)}
                >
                  Place Order
                </button>
                <button>Cancel Order</button>
              </td>
              <td>No</td> */}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
