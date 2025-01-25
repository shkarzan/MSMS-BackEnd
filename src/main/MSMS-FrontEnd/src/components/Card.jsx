import React from "react";
import "../Css/Card.css";

export default function Card({title,data}) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{data}</p>
    </div>
  );
}
