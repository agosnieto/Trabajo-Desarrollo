import { useState } from "react";

export function FiltrosArticulos({ onConsultarArticulos }) {
	const [articulo, setArticulo] = useState("");
	const onFiltrar = () => {
		onConsultarArticulos({ id_articulo: articulo });
	};
	return (
		<>
			<input
				type="text"
				className=""
				id=""
				placeholder="Articulo"
				onChange={(event) => {
					setArticulo(event.target.value);
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
