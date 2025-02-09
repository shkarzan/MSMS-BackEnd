import React, { useState } from "react";
import "../Css/Invoice.css";

export default function InvoiceTable({
  medList,
  totals,
  quantities,
  setTotals,
  setQuantities,
  removeMed,
  setIsRight,
}) {
  const handleQuantityChange = (index, price, e, quantity) => {
    if (e.target.value > quantity) {
      setIsRight(false);
    } else {
      setIsRight(true);
      let newQuantities = [...quantities];
      let newTotals = [...totals];
      newQuantities[index] = e.target.value;
      newTotals[index] = newQuantities[index] * price;
      setQuantities(newQuantities);
      setTotals(newTotals);
    }
  };
  return (
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
        {medList.map((med, index) => (
          <tr key={index}>
            <td>{med.medCode.toUpperCase()}</td>
            <td>{med.medName}</td>
            <td>
              <input
                type="text"
                onChange={(e) =>
                  handleQuantityChange(index, med.price, e, med.quantity)
                }
                placeholder={med.quantity}
              />
            </td>
            <td>{med.price}</td>
            <td>{totals[index]}</td>
            <td>
              <button onClick={() => removeMed(med.medCode, index)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
