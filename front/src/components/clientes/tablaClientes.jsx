export function TablaClientes({items}){
    return(
        <table className="table" >
        <thead>
            <tr>
            <th>ORDEN</th>
            <th>CUIL</th>
            <th>NOMBRE</th>
            <th>TIPO DE CLIENTE</th>
            <th>FECHA DE NACIMIENTO</th>     
            </tr>
        </thead>
        <tbody>
        {items && items.map((items, index)=>{
            return(
                <>
            <tr key={index}>
            <td><strong>{index+1}</strong></td>
            <td>{items.Cuil}</td>
            <td>{items.Nombre}</td>
            <td>{items.id_tipo_cliente}</td>
            <td>{items.Fecha_nacimiento}</td>
            </tr>
            </>)  
        })}
        </tbody>
    </table>
    )
}
