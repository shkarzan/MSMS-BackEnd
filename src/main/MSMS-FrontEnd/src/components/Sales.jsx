import { use, useEffect, useState } from "react";
import "../Css/Sales.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import CommonTable from "./CommonTable";
const Sales = ({ isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sales, setSales] = useState([]);
  const url = "/api/sales";
  const loadSales = async () => {
    await axios
      .get(`${url}/all`)
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadSales();
  }, []);

  const tableHeader = [
    "Sales Id",
    "Sub Total",
    "Tax Rate (%)",
    "Tax Amount",
    "Discount Rate (%)",
    "Discount Amount",
    "Total",
    "Action",
  ];

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
      <h1>Sales</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Sales id"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <CommonTable
        tableHeader={tableHeader}
        aob={filteredSales}
        removeFun={handleSalesDelete}
        data={"sales"}
        isAdmin={isAdmin}
      />
    </div>
  );
};
export default Sales;
