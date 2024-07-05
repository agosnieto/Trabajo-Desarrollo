import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { articulosService } from '../../services/articulos.services';
import "./articulos-routes.css"
import { TablaArticulos } from '../../components/articulos/tablaArticulos';

export default function Baja() {
    const [rows, setRows] = useState([]);
    const [id_articulo, setArticulo] = useState('');
    const [nombre_articulo, setNombre] = useState('');
    const [borrado, setBorrado] = useState('');
    const [fecha_compra, setFecha] = useState('');
    const [id_tipo_articulo, setTipoArticulo] = useState('');

    const [error, setError] = useState('');
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        cargarArticulos();
    }, []);

    const cargarArticulos = () => {
        articulosService.getArticulos()
            .then(data => setRows(data))
            .catch(err => setError('Error al cargar los artículos'));
    };

    const onSubmit = async (data) => {
        try {
            const result = await articulosService.deleteArticulos(data.id_articulo);
            setArticulo(result.id_articulo);
            setNombre(result.nombre_articulo);
            setFecha(result.fecha_compra);
            setTipoArticulo(result.id_tipo_articulo);
            setBorrado('Artículo eliminado:');
            // Actualizar la lista de artículos excluyendo el eliminado
            setRows(prevRows => prevRows.filter(item => item.id_articulo !== data.id_articulo));
            // Resetear el formulario
            reset();
        } catch (error) {
            console.error('Error al eliminar el artículo', error);
            setError('Error al eliminar el artículo');
        }
    };

    if (id_articulo) {
        setTimeout(() => {
            setArticulo('');
            setNombre('');
            setFecha('');
            setTipoArticulo('');
            setBorrado('');
        }, 3000);
    }

    if (error) {
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    return (
        <div>
            <div className="contenedor-form">
                <p className="subtitulo">Si desea eliminar un artículo ingrese su id.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">ID del Artículo:</label>
                        <input type="text" className="form-control" {...register('id_articulo', { required: true })}required placeholder='Ingrese el ID del articulo a dar de baja' />
                    </div>
                    <button type="submit" className="btn btn-primary">Eliminar</button>
                </form>
                {error && (
                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </symbol>
                            </svg>
                            El número ingresado es incorrecto, inténtelo nuevamente.
                        </div>
                    </div>
                )}
            </div>
            <div>
                <h7 style={{ color: 'grey' }}>Nota: El número de ID a ingresar debe encontrarse en la lista de abajo.</h7>
                {id_articulo &&
                <div className="card mt-3" style={{margin: '10px'}}>
                    <div className="card-body">
                        <h5 className="card-title">Detalles del artículo dado de baja:</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Id Artículo:</strong> {id_articulo}</li>
                            <li className="list-group-item"><strong>Nombre:</strong> {nombre_articulo}</li>
                            <li className="list-group-item"><strong>Fecha de Compra:</strong> {fecha_compra}</li>
                            <li className="list-group-item"><strong>Id Tipo de Arículo:</strong> {id_tipo_articulo}</li>
                        </ul>
                    </div>
                </div>
                }
                <TablaArticulos items={rows} />
            </div>
        </div>
    );
}
