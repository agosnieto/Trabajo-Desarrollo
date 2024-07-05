import axios from 'axios';

const urlResource = 'http://localhost:8080/api/clientes';

const getClientes = (cuil) => {
    if (!cuil || cuil === "") {
        return getAll();
    } else {
        return getByFilters(cuil);
    }
};

const getAll = () => {
    return axios.get(urlResource).then((res) => res.data);
};

const getByFilters = (cuil) => {
    return axios.get(`${urlResource}/${cuil}`).then((res) => [res.data]);
};

const insertClientes = (datos) => {
    const { cuil, nombre, id_tipo_cliente, fecha_nac } = datos;
    return axios.post(urlResource, {
        cuil,
        nombre,
        id_tipo_cliente,
        fecha_nacimiento: fecha_nac
    }).then((res) => res.data);
};

const deleteClientes = (cuil) => {
    return axios.delete(`${urlResource}/${cuil}`).then((res) => res.data);
};

const modificarClientes = (datos) => {
    const { cuil, nombre, id_tipo_cliente, fecha_nac } = datos;
    return axios.put(`${urlResource}/${cuil}`, {
        cuil,
        nombre,
        id_tipo_cliente,
        fecha_nacimiento: fecha_nac
    }).then((res) => res.data);
};

export const clientesService = {
    getClientes,
    insertClientes,
    deleteClientes,
    modificarClientes
};
