import { useState } from "react";

export function FiltrosClientes({ onConsultarClientes }) {
	const [cliente, setCliente] = useState("");
	const onFiltrar = () => {
		onConsultarClientes({ Cuil: cliente });
	};
	return (
		<>
			<input
				type="text"
				className=""
				id=""
				placeholder="Cliente"
				onChange={(event) => {
					setCliente(event.target.value);
				}}
			></input>

			<div className="">
				<button type="button" className="" onClick={onFiltrar}>
					Consultar
				</button>
			</div>
		</>
	);
}
