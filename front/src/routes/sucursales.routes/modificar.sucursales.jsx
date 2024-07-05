import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { sucursalesServices } from '../../services/sucursales.services';
import { TablaSucursales } from '../../components/sucursales/tablaSucursales';

export default function Modificar() {
  const [rows, setRows] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    sucursalesServices.getSucursales()
      .then(data => setRows(data))
      .catch(err => setMensaje('Error al cargar las sucursales'));
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await sucursalesServices.modificarSucursal(data);
      setMensaje(
          <div className="card mt-3" style={{margin: '10px'}}>
              <div className="card-body">
              <h5 className="card-title">Detalles del articulo modificado:</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Nombre del Barrio:</strong>{result.direc_sucursal}</li>
              </ul>
              </div>
          </div>
          );
      reset();
      const updatedRows = await sucursalesServices.getSucursales();
      setRows(updatedRows);
    } catch (error) {
      setMensaje('Error, no se pudo modificar la sucursal.');
    }

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  return (
    <div className='form-center-articulo'>
      <p className="subtitulo">Ingrese el id de la sucursal a modificar.<br></br>Recuerde que el número ingresado debe 
        pertenecer a una sucursal ya creada.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Id sucursal:</label>
          <input type="number" className="form-control" {...register('id_sucursal', { required: true })} required placeholder='Ingrese el ID de la sucursal a modificar (Debe existir)'/>
        </div>
        <div className="mb-3">
          <label className="form-label">Calle/Dirección de la sucursal:</label>
          <input type="text" className="form-control" {...register('direc_sucursal', { required: true })} required placeholder='Ingrese la nueva direccion de la sucursal'/>
        </div>
        <button type="submit" className="btn btn-primary">Modificar</button>
      </form>
      <p>{mensaje}</p>
      <TablaSucursales items={rows} />
    </div>
  );
}
