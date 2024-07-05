import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import ventasService from '../../services/ventas.services';
import { ListarVentas } from '../../components/ventas/ListarVentas';

export default function AltaVentas() {
  const { register, handleSubmit, reset } = useForm();
  const [ventas, setVentas] = useState([]);
  const [agregado, setAgregado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await ventasService.getVentas();
        setVentas(res);
      } catch (err) {
        console.error('Error al obtener las ventas:', err);
      }
    };

    fetchVentas();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log('Esta es la data que envio desde el front:', data);
      const res = await ventasService.Agregar(data);
      setAgregado(
        <div className="alert alert-success" role="alert">
          Venta agregada correctamente.
        </div>
      );
      setVentas((prevVentas) => [...prevVentas, res]);
      reset(); // Limpiar el formulario después de éxito
    } catch (err) {
      console.error('Error al agregar la venta:', err);
      setError(
        <div className="alert alert-danger" role="alert">
          Error al agregar la venta. Por favor, inténtelo de nuevo.
        </div>
      );
    }
  };

  return (
    <div className="contenedor-form">
      <p className="subtitulo">
        Agregue una nueva venta ingresando los datos en el formulario de abajo.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Número de venta:</label>
          <input
            type="number"
            className="form-control"
            {...register('NroVenta')}
            required
            placeholder="Ingrese el número de venta a registrar"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CUIL del cliente:</label>
          <input
            type="text"
            className="form-control"
            {...register('Cliente_cuil')}
            required
            placeholder="Ingrese el CUIL del cliente a registrar (Debe existir)"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Legajo del vendedor:</label>
          <input
            type="text"
            className="form-control"
            {...register('Vendedor_leg')}
            required
            placeholder="Ingrese el legajo del vendedor (Debe existir)"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ID del artículo:</label>
          <input
            type="text"
            className="form-control"
            {...register('Articulo_id')}
            required
            placeholder="Ingrese el ID del artículo (Debe existir)"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de la venta:</label>
          <input
            type="date"
            className="form-control"
            {...register('Fecha_venta')}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ID de sucursal:</label>
          <input
            type="text"
            className="form-control"
            {...register('id_sucursal')}
            required
            placeholder="Ingrese el ID de la sucursal (Del 1 al 10)"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
      {agregado}
      {error}
      <ListarVentas items={ventas} />
    </div>
  );
}
