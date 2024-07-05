import React from "react";

export function TablaTipoCliente({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID TIPO CLIENTE</th>
          <th>DESCRIPCION</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id_tipo_cliente}>
              <td>{item.id_tipo_cliente}</td>
              <td>{item.descripcion}</td>
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
