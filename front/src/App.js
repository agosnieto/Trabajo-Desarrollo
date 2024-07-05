import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import ConsultaVentas from "./routes/ventas.routes/consulta.ventas";
import AltaVentas from "./routes/ventas.routes/alta.ventas";
import BajaVentas from "./routes/ventas.routes/baja.ventas";
import ModificarVentas from "./routes/ventas.routes/modificar.ventas";
import ConsultaClientes from "./routes/cliente.routes/consulta.clientes";
import AltaClientes from "./routes/cliente.routes/alta.clientes";
import BajaClientes from "./routes/cliente.routes/baja.clientes";
import ModificarClientes from "./routes/cliente.routes/modificar.clientes";
import ConsultaArticulos from "./routes/articulos.routes/consulta.articulos";
import AltaArticulos from "./routes/articulos.routes/alta.articulos";
import BajaArticulos from "./routes/articulos.routes/baja.articulos";
import ModificarArticulos from "./routes/articulos.routes/modificar.articulos";
import ConsultaVendedores from "./routes/vendedores.routes/consulta.vendedores";
import AltaVendedores from "./routes/vendedores.routes/alta.vendedores";
import BajaVendedores from "./routes/vendedores.routes/baja.vendedores";
import ModificarVendedores from "./routes/vendedores.routes/modificar.vendedores";
import ConsultaBarrios from "./routes/barrios.routes/consulta.barrios";
import ModificarBarrios from "./routes/barrios.routes/modificar.barrios"
import ConsultaSucursales from "./routes/sucursales.routes/consulta.sucursales";
import ModificarSucursal from "./routes/sucursales.routes/modificar.sucursales";
import ConsultaTipoCliente from "./routes/tipoclientes.routes/consulta.tipoclientes";
import ModificarTipoCliente from "./routes/tipoclientes.routes/modificar.tipoclientes"
import ConsultaTipoArticulo from "./routes/tipoarticulos.routes/consulta.tipoarticulos";
import ModificarTipoArticulo from "./routes/tipoarticulos.routes/modificar.tipoarticulos";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home/>} />
					<Route path="/clientes/consulta" element={<ConsultaClientes />} />
					<Route path="/clientes/alta" element={<AltaClientes />} />
					<Route path="/clientes/baja" element={<BajaClientes />} />
					<Route path="/clientes/modificar" element={<ModificarClientes />} />
		
					<Route path="/vendedores/consulta" element={<ConsultaVendedores />} />
					<Route path="/vendedores/alta" element={<AltaVendedores />} />
					<Route path="/vendedores/baja" element={<BajaVendedores />} />
					<Route path="/vendedores/modificar" element={<ModificarVendedores />} />
				
					<Route path="/ventas/consulta" element={<ConsultaVentas />} />
					<Route path="/ventas/alta" element={<AltaVentas />} />
					<Route path="/ventas/baja" element={<BajaVentas />} />
					<Route path="/ventas/modificar" element={<ModificarVentas />} />

					<Route path="/articulos/consulta" element={<ConsultaArticulos />} />
					<Route path="/articulos/alta" element={<AltaArticulos />} />
					<Route path="/articulos/baja" element={<BajaArticulos />} />
					<Route path="/articulos/modificar" element={<ModificarArticulos />} />

					<Route path="/barrios/consulta" element={<ConsultaBarrios />} />
					<Route path="/barrios/modificar" element={<ModificarBarrios />} />

					<Route path="/sucursales/consulta" element={<ConsultaSucursales />} />
					<Route path="/sucursales/modificar" element={<ModificarSucursal />} />

					<Route path="/tipoclientes/consulta" element={<ConsultaTipoCliente />} />
					<Route path="/tipoclientes/modificar" element={<ModificarTipoCliente />} />

					<Route path="/tipoarticulos/consulta" element={<ConsultaTipoArticulo />} />
					<Route path="/tipoarticulos/modificar" element={<ModificarTipoArticulo />} />

			</Routes>
			<Footer />
		</div>
	);
}

export default App;
