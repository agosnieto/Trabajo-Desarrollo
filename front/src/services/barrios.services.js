import axios from "axios";

const urlResource = "http://localhost:8080/api/barrios";

const getBarrios = (id_barrio) => {
  if (!id_barrio || id_barrio === "") {
    return getAllBarrios();
  } else {
    return getBarriosByFilters(id_barrio);
  }
};

async function getAllBarrios() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

async function getBarriosByFilters(id_barrio) {
  // Convertir a número y validar
  const barrioId = Number(id_barrio);
  if (isNaN(barrioId)) {
    throw new Error("ID de barrio no válido");
  }
  const resp = await axios.get(`http://localhost:8080/api/barrios/${barrioId}`);
  return [resp.data]; // Devuelve como lista
}

const modificarBarrio = async (datos) => {
  const { id_barrio, nombre_barrio } = datos;
  const barrioId = Number(id_barrio);
  if (isNaN(barrioId)) {
    throw new Error("ID de barrio no válido");
  }

  const resp = await axios.put(`http://localhost:8080/api/barrios/${barrioId}`, {
    id_barrio: barrioId,
    nombre_barrio,
  });

  return resp.data;
};

export const barriosServices = {
  getBarrios,
  modificarBarrio,
};
