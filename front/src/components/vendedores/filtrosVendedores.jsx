import {useState} from 'react'

export default function FiltrosVendedor({onConsultarVendedor}){
    const [vendedor, setVendedor] = useState('')
    const onFiltrar = () =>{
        onConsultarVendedor({legajo: vendedor})
    }
    return(
        <>
            <input type="text"
            className=""
            id="" 
            placeholder="Vendedor"
            onChange={(event) => {setVendedor(event.target.value)}}>
            </input>
            <div className="">
                <button type="button"
                className=""
                onClick={onFiltrar}
                >Consultar</button>
            </div>
        </>
    )
}