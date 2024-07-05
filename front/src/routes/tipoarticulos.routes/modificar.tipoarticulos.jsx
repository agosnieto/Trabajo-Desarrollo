import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { tipoArticulosServices } from '../../services/tipoarticulos.services';
import { TablaTipoArticulo } from '../../components/tipoarticulo/tablaTipoArticulo';

export default function Modificar() {
  const [rows, setRows] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    tipoArticulosServices.getTipoArticulo()
      .then(data => setRows(data))
      .catch(err => setMensaje('Error al cargar los tipos de articulo'));
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await tipoArticulosServices.modificarTipoArticulo(data);
      setMensaje(`Barrio modificado: ${result.nombre_tipo_articulo}`);
      reset();
      const updatedRows = await tipoArticulosServices.getTipoArticulo();
      setRows(updatedRows);
    } catch (error) {
      setMensaje('Error, no se pudo modificar el barrio.');
    }
    // Resetear el mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  return (
    <div className='form-center-articulo'>
      <p className="subtitulo">Ingrese el id del tipo de articulo a modificar.<br></br>Recuerde que el número ingresado debe 
        pertenecer a un tipo de articulo ya creado.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Id tipo articulo:</label>
          <input type="number" className="form-control" {...register('id_tipo_articulo', { required: true })}required placeholder='Ingrese el ID del tipo articulo a modificar (Debe existir)' />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre del tipo de articulo:</label>
          <input type="text" className="form-control" {...register('nombre_tipo_articulo', { required: true })}required placeholder='Ingrese el nuevo nombre del tipo articulo'/>
        </div>
        <button type="submit" className="btn btn-primary">Modificar</button>
      </form>
      <p>{mensaje}</p>
      <TablaTipoArticulo items={rows} />
    </div>
  );
}
