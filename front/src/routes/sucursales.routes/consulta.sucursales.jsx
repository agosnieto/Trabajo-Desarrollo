import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sucursalesServices } from "../../services/sucursales.services";
import { TablaSucursales } from "../../components/sucursales/tablaSucursales";

const ConsultaSucursales = () => {
  const [lista, setLista] = useState([]);
  const [id_sucursal, setSucursal] = useState(null);
  const [noExiste, setNoExiste] = useState('');
  const { register, handleSubmit } = useForm();

  // Cargar todos las sucursales al montar el componente
  useEffect(() => {
    sucursalesServices.getSucursales()
      .then((data) => {
        setLista(data);
        setNoExiste('');
      })
      .catch(() => {
        setLista([]);
        setNoExiste('No se pudo cargar la lista de sucursales.');
      });
  }, []);

  // Efecto para manejar la búsqueda por ID
  useEffect(() => {
    if (id_sucursal !== null && id_sucursal !== '') {
      sucursalesServices.getSucursales(id_sucursal)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setLista(data);
            setNoExiste('');
          } else {
            setLista([]);
            setNoExiste('No existe una sucursal con ese ID.');
          }
        })
        .catch(() => {
          setLista([]);
          setNoExiste('No existe una sucursal con ese ID.');
        });
    }
  }, [id_sucursal]);

  const onSubmit = (data) => {
    if (data.id_sucursal === '' || data.id_sucursal === undefined) {
      // Si el campo está vacío, carga todos las sucursales nuevamente
      sucursalesServices.getSucursales()
        .then((data) => {
          setLista(data);
          setNoExiste('');
        })
        .catch(() => {
          setLista([]);
          setNoExiste('No se pudo cargar la lista de sucursales.');
        });
    } else {
      setSucursal(data.id_sucursal);
    }
    console.log('Submitted Data:', data);
  };

  return (
    <div>
      <p className="subtitulo">Aquí podrá consultar los datos de las sucursales ingresando los ID.</p>
      <div className="contenedor-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el ID de la sucursal a buscar"
              {...register('id_sucursal')}
            />
          </div>
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>
      <div>
        {noExiste && (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
              <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </symbol>
              </svg>
              {noExiste}
            </div>
          </div>
        )}
        <TablaSucursales items={lista} />
      </div>
    </div>
  );
};

export default ConsultaSucursales;
