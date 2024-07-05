export function TablaArticulos({items}){
    return(
        <table className="table" >
        <thead>
            <tr>
            <th>ID</th>
            <th>NOMBRE ARTICULO</th>
            <th>FECHA DE COMPRA</th>
            <th>TIPO DE ARTICULO</th>

            </tr>
        </thead>
        <tbody>
        {items && items.map((items)=>{
            return(
                <>
            <tr key={items.id_articulo}>
            <td>{items.id_articulo}</td>
            <td>{items.nombre_articulo}</td>
            <td>{items.fecha_compra}</td>
            <td>{items.id_tipo_articulo}</td>

            </tr>
            </>)  
        })}
        </tbody>
    </table>
    )
}
