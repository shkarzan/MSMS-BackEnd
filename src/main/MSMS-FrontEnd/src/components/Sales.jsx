import { use, useEffect, useState } from "react";
import "../Css/Sales.css";
import Sidebar from "./StaffSidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
const Sales = ({ logout, name, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sales, setSales] = useState([]);
  const url = "http://localhost:8080/api/sales";
  const loadSales = async () => {
    await axios
      .get(`${url}/all`)
      .then((res) => {
        console.log(res.data);
        setSales(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadSales();
  }, []);

  const handleSalesDelete = async (salesId) => {
    await axios
      .delete(`${url}/delete/${salesId}`)
      .then((res) => {
        NotificationManager.success(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    loadSales();
  };

  const filteredSales = sales.filter((sale) => {
    return sale.salesId.toString().includes(searchTerm);
  });

  return (
    <div className="sales">
      {/* <Sidebar logout={logout} name={name} isAdmin={isAdmin} /> */}
      <h1>Sales</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Sales id"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Sales Id</th>
            <th>Sub Total</th>
            <th>Tax Amount</th>
            <th>Discount Amount</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale, index) => (
            <tr key={index}>
              <th scope="row">{sale.salesId}</th>
              <td>{sale.subTotal}</td>
              <td>{sale.taxAmount}</td>
              <td>{sale.discountAmount}</td>
              <td>{sale.total}</td>
              <td>
                <button onClick={() => handleSalesDelete(sale.salesId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Sales;
