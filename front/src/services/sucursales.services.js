import axios from "axios";

const urlResource = "http://localhost:8080/api/sucursales";

const getSucursales = (id_sucursal) => {
	if (!id_sucursal || id_sucursal === "") {
		return getAllSucursales();
	} else {
		return getSucursalesByFilters(id_sucursal);
	}
};

async function getAllSucursales() {
	const resp = await axios.get(urlResource);
	return resp.data;
}

async function getSucursalesByFilters(id_sucursal) {
    return axios.get(`http://localhost:8080/api/sucursales/${id_sucursal}`)
    .then((res) => {
        const {data} = res;
        const resultado = data
        const lista = [resultado]
        return lista
    });
}


const modificarSucursal = (datos)=>{
    const id_sucursal = datos.id_sucursal
    const direc_sucursal = datos.direc_sucursal
    
    return axios
    .put(`http://localhost:8080/api/sucursales/${id_sucursal}`, 
    {id_sucursal,
    direc_sucursal,

    }
    )
    .then((res)=>{
        const {data} = res
        const resultado = data
        return resultado
    })
}



export const sucursalesServices = {
	getSucursales,
	modificarSucursal
};
