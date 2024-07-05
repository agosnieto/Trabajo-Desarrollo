import React from 'react';

export function ListarVentas({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>NRO. VENTA</th>
          <th>CUIL CLIENTE</th>
          <th>LEGAJO VENDEDOR</th>
          <th>ID ARTICULO</th>
          <th>FECHA VENTA</th>
          <th>ID SUCURSAL</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <tr key={index}>
              <td><strong>{index + 1}</strong></td>
              <td>{item.Nro_venta}</td>
              <td>{item.Cliente_cuil}</td>
              <td>{item.Vendedor_leg}</td>
              <td>{item.Articulo_id}</td>
              <td>{item.Fecha_venta}</td>
              <td>{item.id_sucursal}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay ventas disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
