import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { articulosService } from "../../services/articulos.services";
import "./articulos-routes.css";
import { TablaArticulos } from "../../components/articulos/tablaArticulos";

export default function Alta() {
    const [articulos, setArticulos] = useState([]);
    const [agregado, setAgregado] = useState();
    const [error, setError] = useState();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        // Fetch existing articles when the component mounts
        articulosService.getArticulos().then((res) => {
            setArticulos(res);
        });
    }, []);

    const onSubmit = (data) => {
        articulosService.insertArticulos(data)
            .then((res) => {
                setArticulos([...articulos, res]);
                setAgregado(
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </symbol>
                            </svg>
                            Artículo agregado!
                        </div>
                    </div>
                );
                reset();
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
                            Error al agregar el articulo
                        </div>
                    </div>
                );
            });
    };

    if (agregado) {
        setTimeout(() => {
            setAgregado();
        }, 3000);
    }

    if (error) {
        setTimeout(() => {
            setError();
        }, 3000);
    }

    return (
        <div className="form-center-articulo">
            <p className="subtitulo">Agregue un nuevo artículo ingresando los datos en el formulario de abajo. <br />
                Recuerde que el número a ingresar no debe existir.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Id:</label>
                    <input type="number" min={0} className="form-control" {...register('id_articulo')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" {...register('nombre_articulo')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de compra:</label>
                    <input type="date" className="form-control" max={"2024-07-05"} {...register('fecha_compra')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de articulo:</label>
                    <input type="number" min={0} className="form-control" {...register('id_tipo_articulo')} />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
            <p>{error}</p>
            <p>{agregado}</p>
            <TablaArticulos items ={articulos}/>
        </div>
    );
};
