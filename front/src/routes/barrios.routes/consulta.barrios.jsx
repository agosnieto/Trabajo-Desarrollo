import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { barriosServices } from "../../services/barrios.services";
import { TablaBarrios } from "../../components/barrios/tablaBarrios";

const ConsultaBarrios = () => {
  const [lista, setLista] = useState([]);
  const [id_barrio, setBarrio] = useState(null);
  const [noExiste, setNoExiste] = useState('');
  const { register, handleSubmit } = useForm();

  // Cargar todos los barrios al montar el componente
  useEffect(() => {
    barriosServices.getBarrios()
      .then((data) => {
        setLista(data);
        setNoExiste('');
      })
      .catch(() => {
        setLista([]);
        setNoExiste('No se pudo cargar la lista de barrios.');
      });
  }, []);

  // Efecto para manejar la búsqueda por ID
  useEffect(() => {
    if (id_barrio !== null && id_barrio !== '') {
      barriosServices.getBarrios(id_barrio)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setLista(data);
            setNoExiste('');
          } else {
            setLista([]);
            setNoExiste('No existe un barrio con ese ID.');
          }
        })
        .catch(() => {
          setLista([]);
          setNoExiste('No existe un barrio con ese ID.');
        });
    }
  }, [id_barrio]);

  const onSubmit = (data) => {
    if (data.id_barrio === '' || data.id_barrio === undefined) {
      // Si el campo está vacío, carga todos los barrios nuevamente
      barriosServices.getBarrios()
        .then((data) => {
          setLista(data);
          setNoExiste('');
        })
        .catch(() => {
          setLista([]);
          setNoExiste('No se pudo cargar la lista de barrios.');
        });
    } else {
      setBarrio(data.id_barrio);
    }
    console.log('Submitted Data:', data);
  };

  return (
    <div>
      <p className="subtitulo">Aquí podrá consultar los datos del barrio ingresando el ID del mismo.</p>
      <div className="contenedor-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el ID del barrio a buscar"
              {...register('id_barrio')}
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
        <TablaBarrios items={lista} />
      </div>
    </div>
  );
};

export default ConsultaBarrios;
