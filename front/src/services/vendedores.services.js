import axios from "axios";

const urlResource = "http://localhost:8080/api/vendedores/";

const getVendedores = (legajo) => {
	if (!legajo || legajo === "") {
		return getAllVendedores();
	} else {
		return getVendedoresByFilters(legajo);
	}
};

async function getAllVendedores() {
	const resp = await axios.get("http://localhost:8080/api/vendedores/");
	return resp.data;
}

async function getVendedoresByFilters(legajo) {
	// esta de esta forma porque genera waring con eslint
	const resp = await axios.get(`http://localhost:8080/api/vendedores/${legajo}`);
	return resp.data;
}

async function Agregar(data) {
	const vendedor = {
		legajo: data.legajo,
		nombre_vendedor: data.nombre_vendedor,
		id_barrio: data.id_barrio,
		fecha_ingreso: data.fecha_ingreso,
	};
	console.log("Nuevo vendedor",vendedor)
	const respuesta = await axios.post(urlResource, vendedor);


	console.log('Respuesta=', respuesta)
	const creado = respuesta.data;
	return creado;
}

async function modificarVendedor(data) {
	const vendedor = {
		legajo: data.legajo,
		nombre_vendedor: data.nombre_vendedor,
		id_barrio: data.id_barrio,
		fecha_ingreso: data.fecha_ingreso,
	};
	const respuesta = await axios.put(
		// esta de esta forma porque genera waring con eslint
		`http://localhost:8080/api/vendedores/${data.legajo}`,
		vendedor
	);
	const actualizado = respuesta.data;
	return actualizado;
}

const borrarVendedor = (legajo) =>{
    return axios.delete(`http://localhost:8080/api/vendedores/${legajo}`)
    .then((res) => {
        const {data} = res;
        const resultado = data
        return resultado;
    });
}

export const vendedoresService = {
	getVendedores,
	Agregar,
	modificarVendedor,
	borrarVendedor,
};

export default vendedoresService;
