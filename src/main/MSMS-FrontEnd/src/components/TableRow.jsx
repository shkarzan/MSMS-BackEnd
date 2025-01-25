import React from "react";
import { useState } from "react";

function TableRow({
  index,
  code,
  name,
  quantity,
  price,
  removeMed,
  totals,
  quantities,
}) {
  const [newQuantity, setQuantity] = useState(0);
  let total = newQuantity * price;
  const newArray = [...totals];
  newArray[index] = total;
  totals[index] = total;
  quantities[index] = newQuantity;

  return (
    <tr>
      <td>{code}</td>
      <td>{name}</td>
      <td>
        <input
          type="text"
          placeholder={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          // value={newQuantity}
        />
      </td>
      <td>{price}</td>
      <td>{total}</td>
      <td>
        <button onClick={() => removeMed(code)}>Remove</button>
      </td>
    </tr>
  );
}

export default TableRow;
