import { useForm } from 'react-hook-form';
import {useState,useEffect } from "react";
import ventasService from '../../services/ventas.services';
import "./ventas-routes.css"
import { ListarVentas } from '../../components/ventas/ListarVentas';

export default function AltaVentas(){
    const [NroVenta, setNroVenta] = useState()
    const [Cliente_cuil, setCliente_cuil] = useState()
    const [Vendedor_leg, setVendedor_leg] = useState()
    const [Articulo_id, setArticulo_Id] = useState()
    const [Fecha_venta, setFecha_venta] = useState()
    const [Nom_sucursal, setNom_sucursal] = useState()
    const [lista, setLista] = useState([])
    const [agregado, setAgregado] = useState()
    const [error, setError] = useState()
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        ventasService.getVentas()
            .then(data => {
                setLista(data);
            })
            .catch(() => {
                setError('No se pudo obtener la lista de ventas');
            });
    }, []);

    const onSubmit = (data) =>{
        ventasService.borrarVenta(data.NroVenta)
        .then((res)=>{
            setNroVenta(res.NroVenta)
            setCliente_cuil(res.Cliente_cuil)
            setVendedor_leg(res.Vendedor_leg)
            setArticulo_Id(res.Articulo_id)
            setFecha_venta(res.Fecha_venta)
            setNom_sucursal(res.Nom_sucursal)
            setAgregado(
                <div className="alert alert-success d-flex align-items-center" role="alert">
                      <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
                      <div>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                              <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </symbol>
                          </svg>
                          Venta eliminada!
                      </div>
                  </div>
            );
            setLista(prevLista => prevLista.filter(item => item.Nro_Venta !== data.NroVenta));
        })
        .catch(()=>{          
            setError(
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol>
                        </svg>
                        El número ingresado es incorrecto, intentelo nuevamente.
                    </div>
                </div>
            );
        });
    }
    if (NroVenta) {
        setTimeout(() => {
          setNroVenta()
          setCliente_cuil()
          setVendedor_leg()
          setArticulo_Id()
          setFecha_venta()
          setNom_sucursal()
        setAgregado()
    }, 5000);
    }
    if(error){
        setTimeout(() => {
            setError()
        }, 5000);
    }
    return(
        <div>
            <div className="contenedor-form">
                <p className="subtitulo">Si desea eliminar una venta podrá hacerlo ingresando el número de la misma.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder='Ingrese el número de venta a eliminar' {...register('NroVenta')} />
                    </div>
                    <button type="submit" className="btn btn-primary">Borrar</button>
                </form>
            </div>
            <div style={{margin:'10px'}}>
                <h7 style={{color:'grey'}}>Nota: El número de venta a ingresar debe encontrarse en la lista de abajo.</h7>
                <p>{error}</p>
                <p>{agregado}</p>
                <ListarVentas items={lista}/>   
            </div>   
        </div>
                   
    )
};

