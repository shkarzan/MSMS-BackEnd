import React from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const CommonTable = ({
  tableHeader,
  aob,
  removeFun,
  orderReceived,
  data,
  orders,
  medNames,
  changeOrderStatus,
  isAdmin,
}) => {
  const checkIfOrderCompleted = (medName, orderId) => {
    if (medNames.includes(medName)) {
      changeOrderStatus(orderId);
    } else {
      NotificationManager.error("Order not recieved yet");
    }
  };

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
                <button
                  onClick={() => removeFun(customer.customerId)}
                  disabled={!isAdmin}
                >
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
                <button
                  onClick={() => removeFun(med.medCode)}
                  disabled={!isAdmin}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        {data == "sales" &&
          aob.map((sale, index) => (
            <tr key={index}>
              <td>{sale.salesId}</td>
              <td>{sale.subTotal}</td>
              <td>{sale.taxRate.toFixed(2)}</td>
              <td>{sale.taxAmount.toFixed(2)}</td>
              <td>{sale.discountRate.toFixed(2)}</td>
              <td>{sale.discountAmount.toFixed(2)}</td>
              <td>{sale.total.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => removeFun(sale.salesId)}
                  disabled={!isAdmin}
                >
                  Remove
                </button>
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
              <td>{supplier.supplierEmail}</td>
              <td>
                <button
                  onClick={() => removeFun(supplier.id)}
                  disabled={!isAdmin}
                >
                  Remove
                </button>
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
                  {order.status === "Completed"
                    ? "Order Recieved"
                    : "Add Medicine"}
                </button>
                <button
                  onClick={() => removeFun(order.orderId)}
                  disabled={!isAdmin}
                >
                  {order.status === "Pending" ? "Cancel Order" : "Remove Order"}
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  hidden={
                    order.medCode !== "NA" || order.status === "Completed"
                  }
                  onClick={() =>
                    checkIfOrderCompleted(order.medName, order.orderId)
                  }
                >
                  Check if Recieved
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
