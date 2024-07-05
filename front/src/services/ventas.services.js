import axios from "axios";

const urlResource = "http://localhost:8080/api/ventas/";

const getVentas = (NroVenta) => {
	if (!NroVenta || NroVenta === "") {
		return getAllVentas();
	} else {
		return getVentasByFilters(NroVenta);
	}
};

async function getAllVentas() {
	const resp = await axios.get(urlResource);
	return resp.data;
}

async function getVentasByFilters(NroVenta) {
	// esta de esta forma porque genera waring con eslint
	const resp = await axios.get(`http://localhost:8080/api/ventas/${NroVenta}`);
	return resp.data;
}

async function Agregar(data) {
	const venta = {
		nro_venta: data.NroVenta,
		cliente_cuil: data.Cliente_cuil,
		vendedor_leg: data.Vendedor_leg,
		articulo_id: data.Articulo_id,
		fecha_venta: data.Fecha_venta,
		id_sucursal: data.id_sucursal,
	};
	console.log("Mi nueva venta :O",venta)
	const respuesta = await axios.post(urlResource, venta);


	console.log('Respuesta=', respuesta)
	const creado = respuesta.data;
	return creado;
}

async function modificarVenta(data) {
	const venta = {
		cliente_cuil: data.Cliente_cuil,
		vendedor_leg: data.Vendedor_leg,
		articulo_id: data.Articulo_id,
		fecha_venta: data.Fecha_venta,
		id_sucursal: data.id_sucursal,
	};
	const respuesta = await axios.put(
		// esta de esta forma porque genera waring con eslint
		`http://localhost:8080/api/ventas/${data.NroVenta}`,
		venta
	);
	const actualizado = respuesta.data;
	return actualizado;
}

async function borrarVenta(NroVenta) {
	return (
		axios
			// esta de esta forma porque genera waring con eslint
			.delete(`http://localhost:8080/api/ventas/${NroVenta}`)
			.then((res) => {
				const { data } = res;
				return data;
			})
	);
}

const ventasService = {
	getVentas,
	Agregar,
	modificarVenta,
	borrarVenta,
};

export default ventasService;
