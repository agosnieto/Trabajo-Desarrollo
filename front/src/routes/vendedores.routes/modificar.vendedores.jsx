import { useForm } from 'react-hook-form';
import {useState,useEffect } from "react";
import vendedoresService from '../../services/vendedores.services';
import { TablaVendedores } from '../../components/vendedores/VendedoresListado';




export default function ModificarVendedores(){
    const [lista, setLista] = useState([])
    const [legajo, setLegajo] = useState()
    const [nombre_vendedor, setNombre_vendedor] = useState()
    const [id_barrio, setId_barrio] = useState()
    const [fecha_ingreso, setFecha_ingreso] = useState()
    const [agregado, setAgregado] = useState()
    const [error, setError] = useState()
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        vendedoresService.getVendedores()
            .then(data => {
                setLista(data);
            })
            .catch(() => {
                setError('No se pudo obtener la lista de vendedores');
            });
    }, []);

    const onSubmit = (data) =>{
        vendedoresService.modificarVendedor(data)
        .then((res)=>{
            setLegajo(data.legajo)
            setNombre_vendedor(res.nombre_vendedor)
            setId_barrio(res.id_barrio)
            setFecha_ingreso(res.fecha_ingreso)

            setAgregado('vendedor modificado:')
        })
        .catch(()=>{          
            setError('No se pudo modificar el vendedor')
        })
    }
    if (legajo) {
        setTimeout(() => {
          setLegajo()
          setNombre_vendedor()
          setId_barrio()
          setFecha_ingreso()
        setAgregado()
    }, 3000);
    }
    if(error){
        setTimeout(() => {
            setError()
        }, 3000);
    }
    

    return(
        <div className='contenedor-form'>
            <p className="subtitulo">Ingrese el legajo de vendedor a modificar.<br></br>Recuerde que el número ingresado debe 
            pertenecer a un vendedor ya existente</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Legajo del vendedor:</label>
                <input type="text"  className="form-control" {...register('legajo')}required placeholder='Ingrese el legajo del vendedor a modificar' />
            </div>
            <div className="mb-3">
                <label className="form-label">Nombre del vendedor:</label>
                <input type="text" className="form-control" {...register('nombre_vendedor')}required placeholder='Ingrese el nuevo nombre de vendedor' />
            </div>
            <div className="mb-3">
                <label className="form-label">Id del barrio:</label>
                <input type="text" className="form-control" {...register('id_barrio')}required placeholder='Ingrese el nuevo id de barrio (Del 1 al 10)' />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha de ingreso:</label>
                <input type="date" className="form-control" max={"2024-07-05"} {...register('fecha_ingreso')}required  />
            </div>
            <button type="submit" className="btn btn-primary">Modificar</button>
            </form>
            <p>{error}</p>
            <p>{agregado}</p>
            <p>{legajo? `Legajo : ${legajo}`: ''}</p>
            <p>{nombre_vendedor? `Nombre del vendedor : ${nombre_vendedor}`: ''}</p>
            <p>{id_barrio? `Id del barrio : ${id_barrio}`: ''}</p>
            <p>{fecha_ingreso? `Fecha de ingreso : ${fecha_ingreso}`: ''}</p>

            <TablaVendedores items={lista}/>   

        </div>
    )
};
