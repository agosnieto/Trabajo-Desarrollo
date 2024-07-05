import React from "react";

export function TablaTipoArticulo({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID TIPO ARTICULO</th>
          <th>NOMBRE TIPO ARTICULO</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id_tipo_articulo}>
              <td>{item.id_tipo_articulo}</td>
              <td>{item.nombre_tipo_articulo}</td>
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
