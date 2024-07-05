import React, { useForm } from 'react-hook-form';
import {useState, useEffect } from "react";
import {clientesService} from "../../services/clientes.services"
import { TablaClientes } from '../../components/clientes/tablaClientes';

export default function Baja(){
    const [cuil, setCuil] = useState()
    const [nombre, setNombre] = useState()
    const [borrado, setBorrado] = useState()
    const [id_tipo_cliente, setTipoCliente] = useState()
    const [fecha, setFecha] = useState()
    const [error, setError] = useState()
    const [rows, setRows] = useState([])
    const { register, handleSubmit } = useForm();
    
    useEffect(() => {
        clientesService.getClientes()
            .then(data => setRows(data))
            .catch(err => setError('Error al cargar los artículos'));
    }, []);
    

    const onSubmit = (data) =>{
        clientesService.deleteClientes(data.cuil)
        .then((res)=>{
            setCuil(res.Cuil)
            setNombre(res.Nombre)
            setTipoCliente(res.id_tipo_cliente)
            setFecha(res.Fecha_nacimiento)
            setBorrado('Usuario eliminado:')
            setRows(prevLista => prevLista.filter(item => item.Cuil !== data.Cuil));
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

    if (error) {
        setTimeout(() => {
            setError()
        }, 3000);
    }

    if(cuil){
        setTimeout(() => {
            setCuil()
            setNombre()
            setTipoCliente()
            setFecha()
            setBorrado()
        }, 3000);
    }
    return(
        <div className="form-center-clientes">
             <p className="subtitulo">Si desea eliminar un cliente podrá hacerlo ingresando el número de cuil del mismo.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Cuil:</label>
                <input type="number" className="form-control" placeholder='Ingrese el cuil del cliente a dar de baja.' {...register('cuil')} required />
            </div>
            <button type="submit" className="btn btn-primary">Eliminar</button>
            </form>
            <p>{error}</p>
            <p>{borrado}</p>
            <p>{cuil}</p>
            <p>{nombre}</p>
            <p>{id_tipo_cliente}</p>
            <p>{fecha}</p>
            <TablaClientes items={rows}/>
        </div>
    )
};
