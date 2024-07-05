import { useEffect, useState } from "react";
import React, { useForm } from 'react-hook-form';
import {clientesService} from '../../services/clientes.services'
import {TablaClientes} from '../../components/clientes/tablaClientes'
import "./clientes-routes.css"

export default function Consulta(){
    const [rows, setRows] = useState([])
    const [cuil, setCuil] = useState()
    const [noExiste, setNoExiste] = useState('')
    useEffect(()=>{
        clientesService.getClientes(cuil)
        .then((data)=>{
            setRows(data)
            setNoExiste('')
        })
        .catch(()=>{
            setNoExiste(
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol>
                        </svg>
                            No existe un cliente con ese cuil.
                    </div>
                </div>
            )
        })
    }, [cuil])

    const onSubmit = (data) =>{
        setCuil(data.cuil)  
    }
    const { register, handleSubmit } = useForm();
    return(
        <div>
            <div className="form-center-clientes">
                <p className="subtitulo">Busque un cliente ingresando en nro. de cuil del mismo.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input type="number" className="form-control" placeholder="Ingrese el cuil del cliente a buscar"{...register('cuil')} />
                    </div>
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </form>
            </div>
            <div>
                <p>{noExiste}</p>
                <TablaClientes items= {rows}>
                </TablaClientes>
            </div>
        </div>
    );
};
