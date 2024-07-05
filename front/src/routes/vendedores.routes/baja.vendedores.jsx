import React, { useForm } from 'react-hook-form';
import {useState,useEffect } from "react";
import { vendedoresService } from '../../services/vendedores.services';
import { TablaVendedores } from '../../components/vendedores/VendedoresListado';

export default function Baja(){
    const [rows, setRows] = useState([])
    const [legajo, setLegajo] = useState()
    const [nombre_vendedor, setNombre] = useState()
    const [borrado, setBorrado] = useState()
    const [id_barrio, setBarrio] = useState()
    const [fecha_ingreso, setFecha] = useState()

    const [error, setError] = useState()
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        vendedoresService.getVendedores()
            .then(data => setRows(data))
            .catch(err => setError('Error al cargar los vendedores'));
    }, []);

    const onSubmit = (data) =>{
        vendedoresService.borrarVendedor(data.id_articulo)
        .then((res)=>{
            setLegajo(res.legajo)
            setNombre(res.nombre_vendedor)
            setBarrio(res.id_tipo_articulo)
            setFecha(res.fecha_ingreso)
            setBorrado('Vendedor borrado:')
            setRows(prevLista => prevLista.filter(item => item.legajo !== data.legajo));
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
                )
        });
    } 
    if (legajo) {
        setTimeout(() => {
        setLegajo()
        setNombre()
        setBarrio()
        setFecha()
        setBorrado()
    }, 3000);
    }
    if(error){
        setTimeout(() => {
            setError()
        }, 3000);
    }

    return(
        <div>
            <div className="contenedor-form">
            <p className="subtitulo">Si desea eliminar un artículo podrá hacerlo ingresando el ID del mismo.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input type="text" className="form-control input-baja" placeholder='Ingrese el legajo del vendedor a dar de baja' {...register('id_articulo')} required/>
                </div>
                <button type="submit" className="btn btn-primary">Eliminar</button>
                </form>
            </div>
            <div>
            <h7 style={{color:'grey'}}>Nota: El número de id a ingresar debe encontrarse en la lista de abajo.</h7>
                <p>{error}</p>
                <p>{borrado}</p>
                <p>{legajo}</p>
                <p>{nombre_vendedor}</p>
                <p>{id_barrio}</p>
                <p>{fecha_ingreso}</p>

                <TablaVendedores items= {rows}/>
            </div>
        </div> 
    )
};
