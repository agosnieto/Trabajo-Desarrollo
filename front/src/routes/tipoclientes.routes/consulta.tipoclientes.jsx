import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { tipoClienteServices } from "../../services/tipoclientes.services";
import { TablaTipoCliente } from "../../components/tipocliente/tablaTipoCliente";

const ConsultaTipoCliente = () => {
  const [lista, setLista] = useState([]);
  const [id_tipo_cliente, setTipoCliente] = useState(null);
  const [noExiste, setNoExiste] = useState('');
  const { register, handleSubmit } = useForm();

  // useEffect(() => {
  //   tipoClienteServices.getTipoCliente()
  //     .then((data) => {
  //       setLista(data);
  //       setNoExiste('');
  //     })
  //     .catch(() => {
  //       setLista([]);
  //       setNoExiste('No se pudo cargar la lista de tipos de cliente.');
  //     });
  // }, []);

  useEffect(() => {
    if (id_tipo_cliente !== null && id_tipo_cliente !== '') {
      tipoClienteServices.getTipoCliente(id_tipo_cliente)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setLista(data);
            setNoExiste('');
          } else {
            setLista([]);
            setNoExiste(
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol>
                    </svg>
                    No existe un tipo de cliente con ese id
                </div>
             </div>
          );
          }
        })
        .catch(() => {
          setLista([]);
          setNoExiste('No existe un tipo de cliente con ese ID.');
        });
    }
  }, [id_tipo_cliente]);

  const onSubmit = (data) => {
    if (data.id_tipo_cliente === '' || data.id_tipo_cliente === undefined) {
      tipoClienteServices.getTipoCliente()
        .then((data) => {
          setLista(data);
          setNoExiste('');
        })
        .catch(() => {
          setLista([]);
          setNoExiste('No se pudo cargar la lista de tipos de cliente.');
        });
    } else {
      setTipoCliente(data.id_tipo_cliente);
    }
    console.log('Submitted Data:', data);
  };

  return (
    <div>
      <p className="subtitulo">Aquí podrá consultar los datos del tipo de cliente ingresando el ID del mismo.</p>
      <div className="contenedor-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el ID del tipo de cliente a buscar"
              {...register('id_tipo_cliente')}
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
        <TablaTipoCliente items={lista} />
      </div>
    </div>
  );
};

export default ConsultaTipoCliente;
