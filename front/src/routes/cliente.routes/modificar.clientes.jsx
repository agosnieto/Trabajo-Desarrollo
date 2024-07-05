import React, { useForm } from 'react-hook-form';
import {useState,useEffect } from "react";
import {clientesService} from "../../services/clientes.services"
import { TablaClientes } from '../../components/clientes/tablaClientes';




export default function Modificar(){
    const [rows, setRows] = useState([])
    const [cuil, setCuil] = useState()
    const [nombre, setNombre] = useState()
    const [agregado, setAgregado] = useState()
    const [id_tipo_cliente, setTipoCliente] = useState()
    const [fecha, setFecha] = useState()
    const [error, setError] = useState()
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        clientesService.getClientes()
            .then(data => setRows(data))
            .catch(err => setError('Error al cargar los artículos'));
    }, []);

    const onSubmit = (data) =>{
        clientesService.modificarClientes(data)
        .then((res)=>{
            setCuil(res.Cuil)
            setNombre(res.Nombre)
            setTipoCliente(res.id_tipo_cliente)
            setFecha(res.Fecha_nacimiento)
            setAgregado(
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </symbol>
                        </svg>
                        Cliente modificado!
                    </div>
                </div>
            );
        })
        .catch(()=>{          
            setError(
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol>
                        </svg>
                        Error, no se pudo modficar el cliente.
                    </div>
                </div>
            );
        });
    }

    if (cuil) {
        setTimeout(() => {
        setCuil()
        setNombre()
        setFecha()
        setTipoCliente()
        setAgregado()
    }, 3000);
    }
    if(error){
        setTimeout(() => {
            setError()
        }, 3000);
    }
    return(
        <div className="form-center-clientes">
            <p className="subtitulo">Ingrese el cuil del cliente a modificar.<br></br>Recuerde que el cuil ingresado debe 
            pertenecer a un cliente ya existente</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Cuil:</label>
                <input type="number" className="form-control" {...register('cuil')}required placeholder="Ingrese el CUIL del cliente a modificar" />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input type="text" className="form-control" {...register('nombre')}required placeholder="Ingrese el nuevo nombre del cliente" />
            </div>
            <div className="mb-3">
                <label className="form-label">Id tipo cliente:</label>
                <input type="text" className="form-control" {...register('id_tipo_cliente')}required placeholder="Ingrese el nuevo ID tipo cliente del 1 al 4" />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha de nacimiento:</label>
                <input type="date" className="form-control" max={"2015-01-01"} {...register('fecha_nac')}required placeholder="Ingrese el nombre del cliente a registrar" />
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
            <p>{error}</p>
            <p>{agregado}</p>
            {cuil &&
                <div className="card mt-3" style={{margin: '10px'}}>
                    <div className="card-body">
                        <h5 className="card-title">Detalles del cliente modificado:</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Cuil:</strong> {cuil}</li>
                            <li className="list-group-item"><strong>Nombre Cliente:</strong> {nombre}</li>
                            <li className="list-group-item"><strong>Tipo Cliente:</strong> {id_tipo_cliente}</li>
                            <li className="list-group-item"><strong>Fecha Nacimiento:</strong> {fecha}</li>
                        </ul>
                    </div>
                </div>
            }
            <TablaClientes items={rows}/>
        </div>
    )
};
