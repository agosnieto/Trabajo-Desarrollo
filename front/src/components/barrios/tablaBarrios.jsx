import React from "react";

export function TablaBarrios({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOMBRE BARRIO</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id_barrio}>
              <td>{item.id_barrio}</td>
              <td>{item.nombre_barrio}</td>
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

