import axios from "axios";

const urlResource = "http://localhost:8080/api/tipoarticulos";

const getTipoArticulo = (id_tipo_articulo) => {
	if (!id_tipo_articulo || id_tipo_articulo === "") {
		return getAllTipoArticulos();
	} else {
		return getTipoArticulosByFilters(id_tipo_articulo);
	}
};

async function getAllTipoArticulos() {
	const resp = await axios.get(urlResource);
	return resp.data;
}

async function getTipoArticulosByFilters(id_tipo_articulo) {
    return axios.get(`http://localhost:8080/api/tipoarticulos/${id_tipo_articulo}`)
    .then((res) => {
        const {data} = res;
        const resultado = data
        const lista = [resultado]
        return lista
    });
}


const modificarTipoArticulo = (datos)=>{
    const id_tipo_articulo = datos.id_tipo_articulo
    const nombre_tipo_articulo = datos.nombre_tipo_articulo
    
    return axios
    .put(`http://localhost:8080/api/tipoarticulos/${id_tipo_articulo}`, 
    {id_tipo_articulo,
    nombre_tipo_articulo,

    }
    )
    .then((res)=>{
        const {data} = res
        const resultado = data
        return resultado
    })
}



export const tipoArticulosServices = {
	getTipoArticulo,
	modificarTipoArticulo
};
