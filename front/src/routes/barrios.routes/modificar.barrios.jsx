import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { barriosServices } from '../../services/barrios.services';
import { TablaBarrios } from '../../components/barrios/tablaBarrios';

export default function Modificar() {
  const [rows, setRows] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    barriosServices.getBarrios()
      .then(data => setRows(data))
      .catch(err => setMensaje('Error al cargar los barrios'));
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await barriosServices.modificarBarrio(data);
      setMensaje(`Barrio modificado: ${result.nombre_barrio}`);
      // Resetear el formulario
      reset();
      // Refrescar la lista de barrios
      const updatedRows = await barriosServices.getBarrios();
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
      <p className="subtitulo">Ingrese el id del barrio a modificar.<br></br>Recuerde que el número ingresado debe 
        pertenecer a un barrio ya creado.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Id barrio:</label>
          <input type="number" className="form-control" {...register('id_barrio', { required: true })}required placeholder='Ingrese el ID del barrio a modificar (Debe existir)' />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre del barrio:</label>
          <input type="text" className="form-control" {...register('nombre_barrio', { required: true })}required placeholder='Ingrese el nuevo nombre del barrio'/>
        </div>
        <button type="submit" className="btn btn-primary">Modificar</button>
      </form>
      <p>{mensaje}</p>
      <TablaBarrios items={rows} />
    </div>
  );
}
