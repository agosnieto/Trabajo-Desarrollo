import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ventasService from '../../services/ventas.services.js';
import { ListarVentas } from "../../components/ventas/ListarVentas";
import "./ventas-routes.css";

const ConsultaVentas = () => {
  const [lista, setLista] = useState([]);
  const [NroVenta, setNroVenta] = useState();
  const [noExiste, setNoExiste] = useState('');

  useEffect(() => {
    if (NroVenta) {
      ventasService.getVentas(NroVenta)
        .then((data) => {
          console.log('Fetched Data:', data); // Log fetched data
          if (data) {
            setLista([data]);
            setNoExiste('');
          } else {
            setLista([]);
            setNoExiste(
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                  <use xlinkHref="#exclamation-triangle-fill" />
                </svg>
                <div>
                  No existe una venta con el número ingresado.
                </div>
              </div>
            );
          }
        }).catch((error) => {
          console.error('Error fetching data:', error); // Log error
          setNoExiste(
            <div className="alert alert-warning d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use xlinkHref="#exclamation-triangle-fill" />
              </svg>
              <div>
                No existe una venta con el número ingresado.
              </div>
            </div>
          );
        });
    } else {
      ventasService.getVentas()
        .then((data) => {
          console.log('Fetched All Data:', data); // Log fetched data
          if (data.length) {
            setLista(data);
            setNoExiste('');
          } else {
            setNoExiste(
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                  <use xlinkHref="#exclamation-triangle-fill" />
                </svg>
                <div>
                  No hay ventas disponibles.
                </div>
              </div>
            );
          }
        }).catch((error) => {
          console.error('Error fetching data:', error); // Log error
          setNoExiste(
            <div className="alert alert-warning d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use xlinkHref="#exclamation-triangle-fill" />
              </svg>
              <div>
                No hay ventas disponibles.
              </div>
            </div>
          );
        });
    }
  }, [NroVenta]);

  const onSubmit = (data) => {
    setNroVenta(data.NroVenta);
    console.log('Submitted Data:', data); // Log submitted data
  };

  const { register, handleSubmit } = useForm();

  return (
    <div>
      <p className="subtitulo">Aquí podrá consultar los datos de una venta ingresando el número de la misma.</p>
      <div className="contenedor-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Ingrese el número de venta a buscar" {...register('NroVenta')} />
          </div>
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>
      <div>
        <p>{noExiste}</p>
        <ListarVentas items={lista}></ListarVentas>
      </div>
    </div>
  );
};

export default ConsultaVentas;
