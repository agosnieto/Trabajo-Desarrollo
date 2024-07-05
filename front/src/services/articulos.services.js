import axios from 'axios'

const getArticulos = (id_articulo)=>{
    if(!id_articulo || id_articulo === ''){
        return getAll()
    }else{
        
        return getByFilters(id_articulo)
    }
    
}

const getAll = ()=>{
    return axios.get(`http://localhost:8080/api/articulos`)
    .then((res) => {
        const {data} = res;
        const articulos = data;
        return articulos
    });

}

const getByFilters = (id_articulo) =>{
    return axios.get(`http://localhost:8080/api/articulos/${id_articulo}`)
    .then((res) => {
        const {data} = res;
        const resultado = data
        const lista = [resultado]
        return lista
    });
}

const insertArticulos = (datos)=>{
    const id_articulo = datos.id_articulo
    const nombre_articulo = datos.nombre_articulo
    const fecha_compra = datos.fecha_compra
    const id_tipo_articulo = datos.id_tipo_articulo

    return axios.post("http://localhost:8080/api/articulos", 
    {
    id_articulo,
    nombre_articulo,
    fecha_compra,
    id_tipo_articulo
    })
    .then((res)=>{
        const {data} = res
        const resultado = data
        return resultado
    })
}

const deleteArticulos = (id_articulo) =>{
    return axios.delete(`http://localhost:8080/api/articulos/${id_articulo}`)
    .then((res) => {
        const {data} = res;
        const resultado = data
        return resultado;
    });
}

const modificarArticulos = (datos)=>{
    const id_articulo = datos.id_articulo
    const nombre_articulo = datos.nombre_articulo
    const fecha_compra = datos.fecha_compra
    const id_tipo_articulo = datos.id_tipo_articulo

    
    return axios
    .put(`http://localhost:8080/api/articulos/${id_articulo}`, 
    {id_articulo,
    nombre_articulo,
    fecha_compra,
    id_tipo_articulo
    }
    )
    .then((res)=>{
        const {data} = res
        const resultado = data
        return resultado
    })
}


export const articulosService = {
    getArticulos,
    insertArticulos,
    deleteArticulos,
    modificarArticulos
}