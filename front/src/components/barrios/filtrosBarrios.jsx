import { useState } from "react";

export function FiltrosBarrios({ onConsultarBarrios }) {
	const [barrio, setBarrio] = useState("");
	const onFiltrar = () => {
		onConsultarBarrios({ id_barrio : barrio });
	};
	return (
		<>
			<input
				type="text"
				className=""
				id=""
				placeholder="Barrio"
				onChange={(event) => {
					setBarrio(event.target.value);
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