import { useForm } from 'react-hook-form';
import {useState, useEffect } from "react";
import ventasService from '../../services/ventas.services';
import { ListarVentas } from '../../components/ventas/ListarVentas';

export default function ModificarVentas(){
    const [lista, setLista] = useState([]);
    const [NroVenta, setNroVenta] = useState();
    const [Cliente_cuil, setCliente_cuil] = useState();
    const [Vendedor_leg, setVendedor_leg] = useState();
    const [Articulo_id, setArticulo_Id] = useState();
    const [Fecha_venta, setFecha_venta] = useState();
    const [id_sucursal, setid_sucursal] = useState();
    const [agregado, setAgregado] = useState();
    const [error, setError] = useState();
    const { register, handleSubmit, reset } = useForm();

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
        ventasService.modificarVenta(data)
        .then((res)=>{
            setNroVenta(data.NroVenta);
            setCliente_cuil(res.Cliente_Cuil);
            setVendedor_leg(res.Vendedor_Leg);
            setArticulo_Id(res.Articulo_Id);
            setFecha_venta(res.Fecha_Venta);
            setid_sucursal(res.id_sucursal);
            setAgregado(
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </symbol>
                        </svg>
                        Venta modificada!
                    </div>
                </div>
                );
            ventasService.getVentas()
                .then(data => {
                    setLista(data);
                })
                .catch(() => {
                    setError(
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </symbol>
                                </svg>
                                Error al modificar la venta.
                            </div>
                        </div>
                    );
                });
        })
        .catch(()=>{          
            setError('No se pudo modificar la venta');
        });
    }

    if (NroVenta) {
        setTimeout(() => {
            setNroVenta();
            setCliente_cuil();
            setVendedor_leg();
            setArticulo_Id();
            setFecha_venta();
            setid_sucursal();
            setAgregado();
        }, 3500);
    }
    if(error){
        setTimeout(() => {
            setError();
        }, 3000);
    }

    return(
        <div className='contenedor-form'>
            <p className="subtitulo">Ingrese el número de venta a modificar.<br></br>Recuerde que el número ingresado debe 
            pertenecer a una venta ya creada</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Numero de venta:</label>
                <input type="text"  className="form-control" {...register('NroVenta')}required placeholder='Ingrese el numero de venta a modificar' />
            </div>
            <div className="mb-3">
                <label className="form-label">Cuil del cliente:</label>
                <input type="text" className="form-control" {...register('Cliente_cuil')}required placeholder='Ingrese el nuevo CUIL (Debe existir)' />
            </div>
            <div className="mb-3">
                <label className="form-label">Legajo del vendedor:</label>
                <input type="text" className="form-control" {...register('Vendedor_leg')}required placeholder='Ingrese el nuevo legajo (Debe existir)' />
            </div>
            <div className="mb-3">
                <label className="form-label">ID del articulo:</label>
                <input type="text" className="form-control" {...register('Articulo_id')}required placeholder='Ingrese el nuevo ID del articulo (Debe existir)' />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha de la venta:</label>
                <input type="date" className="form-control" max={"2024-07-05"} {...register('Fecha_venta')}required />
            </div>
            <div className="mb-3">
                <label className="form-label">Id de sucursal:</label>
                <input type="text" className="form-control" {...register('id_sucursal')}required placeholder='Ingrese la nueva ID de sucursal (Del 1 al 10)' />
            </div>
            <button type="submit" className="btn btn-primary">Modificar</button>
            </form>
            <p>{error}</p>
            <p>{agregado}</p>
            {NroVenta &&
                <div className="card mt-3" style={{margin: '10px'}}>
                    <div className="card-body">
                        <h5 className="card-title">Detalles de la venta modificada:</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>NroVenta:</strong> {NroVenta}</li>
                            <li className="list-group-item"><strong>Cliente CUIL:</strong> {Cliente_cuil}</li>
                            <li className="list-group-item"><strong>Vendedor Legajo:</strong> {Vendedor_leg}</li>
                            <li className="list-group-item"><strong>Articulo ID:</strong> {Articulo_id}</li>
                            <li className="list-group-item"><strong>Fecha Venta:</strong> {Fecha_venta}</li>
                            <li className="list-group-item"><strong>ID Sucursal:</strong> {id_sucursal}</li>
                        </ul>
                    </div>
                </div>
            }
            <ListarVentas items={lista} />
        </div>
    );
};
