import { useEffect, useState } from "react";
import React, { useForm } from 'react-hook-form';
import { articulosService } from "../../services/articulos.services";
import {TablaArticulos } from "../../components/articulos/tablaArticulos";
import "./articulos-routes.css"

export default function Consulta(){
    const [rows, setRows] = useState([])
    const [id_articulo, setId] = useState()
    const [noExiste, setNoExiste] = useState('')
    
    useEffect(()=>{
        articulosService.getArticulos(id_articulo)
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
                    No existe un artículo con ese ID.
                    </div>
                </div>
            )
        });
    }, [id_articulo])

    const onSubmit = (data) =>{
        setId(data.id_articulo)  
    }
    const { register, handleSubmit } = useForm();
    return(
        <div>
            <div className="form-consulta-articulo">
            <p className="subtitulo">Aquí podrá consultar los datos de un artículo.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Ingrese el ID del artículo a buscar" {...register('id_articulo')} />
                </div>
                <button type="submit" className="btn btn-primary">Buscar</button>
                </form>
            </div>
            <div className="tabla-articulos">
                <p>{noExiste}</p>
                <TablaArticulos items= {rows}>
                </TablaArticulos>
            </div>
        </div>
    );
};
