import CardData from "../CardData";
import Card from "./Card";
import "./../Css/Dashboard.css";

const Dashboard = () => {
  const cd = CardData;
  return (
    <>
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        {cd.map((item, index) => (
          <Card key={index} title={item.title} data={item.data} />
        ))}
      </div>
      <div className="dashboard-summary">
        <h2>Summary</h2>
        <p>
          Welcome to the Medical Store Management System dashboard! Here you can
          manage your inventory, track sales, and handle customer orders.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
