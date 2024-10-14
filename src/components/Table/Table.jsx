import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./Table.css";

export function Table({ locais, onRowClick }) {
  return (
    <table className="table table-borderless table-primary  table-container">
      <thead>
        <tr>
          <th>Nome do Local</th>

          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {locais.map((item) => (
          <tr
            key={item.id}
            onClick={() => onRowClick(item.latitude, item.longitude)}
            style={{ cursor: "pointer" }}
          >
            <td>{item.localizacao}</td>

            <td>{item.descricao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
