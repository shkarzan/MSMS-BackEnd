import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommonTable = ({
  tableHeader,
  aob,
  removeFun,
  orderReceived,
  data,
  orders,
}) => {
  const navigate = useNavigate();
  const toAddMedicineComponent = (medCode, medName, quantity) => {
    navigate("/addMedicine", {
      state: { medCode: medCode, medName: medName, quantity: quantity },
    });
  };
  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((th, index) => (
            <th key={index}>{th}</th>
          ))}
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
          aob.map((med, index) => {
            const yesOrNo = orders.some(
              (order) =>
                order.medCode === med.medCode && order.status === "Pending"
            );
            return (
              <tr key={index}>
                <td>{med.medCode}</td>
                <td>{med.medName}</td>
                <td>{med.quantity}</td>
                <td>{med.price}</td>
                <td>{med.expiryDate}</td>
                <td>
                  <button
                    onClick={() => removeFun(med.medName, med.medCode)}
                    disabled={yesOrNo}
                    style={{ backgroundColor: yesOrNo ? "green" : "blue" }}
                  >
                    Place Order
                  </button>
                </td>
                <td>{yesOrNo ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        {data == "supplier" &&
          aob.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.id}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.supplierNumber}</td>
              <td>
                <button onClick={() => removeFun(supplier.id)}>Remove</button>
              </td>
            </tr>
          ))}
        {data == "orders" &&
          aob.map((order, index) => (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.medCode}</td>
              <td>{order.medName}</td>
              <td>{order.quantity}</td>
              <td>{order.supplierName}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>
                <button
                  style={{
                    margin: "5px",
                    backgroundColor:
                      order.status === "Completed" ? "green" : "blue",
                  }}
                  onClick={() => {
                    order.medCode === "NA"
                      ? toAddMedicineComponent(
                          order.medCode,
                          order.medName,
                          order.quantity
                        )
                      : orderReceived(
                          order.orderId,
                          order.medCode,
                          order.quantity
                        );
                  }}
                  disabled={order.status === "Completed"}
                >
                  {order.medCode === "NA" ? "Add Medicine" : "Order Recieved"}
                </button>
                {/* {order.status === "Pending" && ( */}
                <button onClick={() => removeFun(order.orderId)}>
                  {order.status === "Pending" ? "Cancel Order" : "Remove Order"}
                </button>
                {/* )} */}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
