import React from "react";
import "./Card.css";

export function Card({ title, count }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-count">{count}</p>
    </div>
  );
}
