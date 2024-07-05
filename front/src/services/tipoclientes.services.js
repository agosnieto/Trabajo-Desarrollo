import axios from "axios";

const urlResource = "http://localhost:8080/api/tipoclientes";

const getTipoCliente = (id_tipo_cliente) => {
	if (!id_tipo_cliente || id_tipo_cliente === "") {
		return getAllTipoCliente();
	} else {
		return getTipoClienteByFilters(id_tipo_cliente);
	}
};

async function getAllTipoCliente() {
	const resp = await axios.get(urlResource);
	return resp.data;
}

async function getTipoClienteByFilters(id_tipo_cliente) {
    return axios.get(`http://localhost:8080/api/tipoclientes/${id_tipo_cliente}`)
    .then((res) => {
        const {data} = res;
        const resultado = data
        const lista = [resultado]
        return lista
    });
}


const modificarTipoCliente = (datos)=>{
    const id_tipo_cliente = datos.id_tipo_cliente
    const descripcion = datos.descripcion
    
    return axios
    .put(`http://localhost:8080/api/tipoclientes/${id_tipo_cliente}`, 
    {id_tipo_cliente,
    descripcion,

    }
    )
    .then((res)=>{
        const {data} = res
        const resultado = data
        return resultado
    })
}



export const tipoClienteServices = {
	getTipoCliente,
	modificarTipoCliente
};
