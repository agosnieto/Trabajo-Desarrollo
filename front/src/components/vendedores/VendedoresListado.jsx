import React from 'react';

export function TablaVendedores({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>LEGAJO</th>
          <th>NOMBRE VENDEDOR</th>
          <th>ID BARRIO</th>
          <th>FECHA INGRESO</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <tr key={index}>
              <td><strong>{index + 1}</strong></td>
              <td>{item.legajo}</td>
              <td>{item.nombre_vendedor}</td>
              <td>{item.id_barrio}</td>
              <td>{item.fecha_ingreso}</td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay vendedores disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
