import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import vendedoresService from '../../services/vendedores.services.js';
import { TablaVendedores } from "../../components/vendedores/VendedoresListado.jsx";

const ConsultaVentas = () => {
  const [lista, setLista] = useState([]);
  const [legajo, setLegajo] = useState();
  const [noExiste, setNoExiste] = useState('');

  useEffect(() => {
    if (legajo) {
      vendedoresService.getVendedores(legajo)
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
                  No existe un vendedor con el número ingresado.
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
      vendedoresService.getVendedores()
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
                  No hay vendedores disponibles.
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
                No hay vendedores disponibles.
              </div>
            </div>
          );
        });
    }
  }, [legajo]);

  const onSubmit = (data) => {
    setLegajo(data.legajo);
    console.log('Submitted Data:', data); // Log submitted data
  };

  const { register, handleSubmit } = useForm();

  return (
    <div>
      <p className="subtitulo">Aquí podrá consultar los datos de un vendedor ingresando el número de la misma.</p>
      <div className="contenedor-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Ingrese el número de vendedores a buscar" {...register('legajo')} />
          </div>
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>
      <div>
        <p>{noExiste}</p>
        <TablaVendedores items={lista}></TablaVendedores>
      </div>
    </div>
  );
};

export default ConsultaVentas;
