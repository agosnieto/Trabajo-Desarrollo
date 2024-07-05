import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { tipoClienteServices } from '../../services/tipoclientes.services';
import { TablaTipoCliente } from '../../components/tipocliente/tablaTipoCliente';

export default function Modificar() {
  const [rows, setRows] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    tipoClienteServices.getTipoCliente()
      .then(data => setRows(data))
      .catch(err => setMensaje('Error al cargar los tipos de cliente'));
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await tipoClienteServices.modificarTipoCliente(data);
      setMensaje(`Tipo cliente modificado: ${result.descripcion}`);
      // Resetear el formulario
      reset();
      // Refrescar la lista de barrios
      const updatedRows = await tipoClienteServices.getTipoCliente();
      setRows(updatedRows);
    } catch (error) {
      setMensaje('Error, no se pudo modificar el tipo cliente.');
    }
    // Resetear el mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  return (
    <div className='form-center-articulo'>
      <p className="subtitulo">Ingrese el id del tipo cliente a modificar.<br></br>Recuerde que el número ingresado debe 
        pertenecer a un tipo cliente ya creado.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Id tipo cliente:</label>
          <input type="number" className="form-control" {...register('id_tipo_cliente', { required: true })}required placeholder='Ingrese el ID del tipo de cliente a modificar (Debe existir)'/>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripcion:</label>
          <input type="text" className="form-control" {...register('descripcion', { required: true })}required placeholder='Ingrese la nueva descripcion del tipo de cliente'/>
        </div>
        <button type="submit" className="btn btn-primary">Modificar</button>
      </form>
      <p>{mensaje}</p>
      <TablaTipoCliente items={rows} />
    </div>
  );
}