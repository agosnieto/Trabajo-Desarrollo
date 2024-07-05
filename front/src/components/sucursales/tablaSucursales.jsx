import React from "react";

export function TablaSucursales({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID SUCURSAL</th>
          <th>DIRECCIÓN SUCURSAL</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id_sucursal}>
              <td>{item.id_sucursal}</td>
              <td>{item.direc_sucursal}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No hay datos disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

