import React, { useEffect, useState } from "react";
import "../Css/Inventory.css";
import CommonTable from "./CommonTable";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default function OutOfStock() {
  // const navigate = useNavigate();
  const url = "http://localhost:8080/api/medicine";
  const [meds, setMed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  const filteredMeds = meds.filter((med) =>
    med.medName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    loadMeds();
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
        <CommonTable
          tableHeader={[
            "Medicine Code",
            "Medicine Name",
            "Quantity Left",
            "Price",
            "Expiry Date",
          ]}
          aob={filteredMeds}
          data={"outOfStock"}
          removeFun={"hello"}
        />
        {/* <div className="buttons">
          <button onClick={() => navigate("/addMedicine")}>Add Medicine</button>
          <button onClick={() => navigate("/updateMedicine")}>
            Update Medicine
          </button>
        </div> */}
        {/* <table>
          <thead>
            <tr>
              <th>Medicine Code</th>
              <th>Medicine Name</th>
              <th>Quantity Left</th>
              <th>Price</th>
              <th>Expiry Date</th>
              <th>Actions</th>
              <th>Order Placed</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeds.map((med, index) => (
              <tr key={index}>
                <td>{med.medCode}</td>
                <td>{med.medName}</td>
                <td>{med.quantity}</td>
                <td>{med.price}</td>
                <td>{med.expiryDate}</td>
                <td style={{display:"flex",gap:"7px",alignItems:"center",justifyContent:"center"}}>
                  <button style={{backgroundColor:"green"}}  onClick={() => removeMed(med.medCode)}>Place Order</button>
                  <button>Cancel Order</button>
                </td>
                <td>No</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
