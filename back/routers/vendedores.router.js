const { Router } = require("express");
const vendedoresRouters = Router();
const VendedoresController = require("../controllers/vendedores.controller.js");
const vendedoresController = new VendedoresController();

vendedoresRouters.get("/", async (req, res) => {
  const data = await vendedoresController.getAll();
  res.status(200).json(data);
});

vendedoresRouters.get("/:legajo", async (req, res) => {
  const legajo = req.params.legajo;
  const data = await vendedoresController.getByLegajo(legajo);
  if (data === null) {
    res.status(404).json({
      error: "No existe un vendedor con ese legajo",
    });
  } else {
    res.status(200).json(data);
  }
});

vendedoresRouters.post("/", async (req, res) => {
  const { body } = req;
  const { legajo, nombre_vendedor,id_barrio, fecha_ingreso } = body;
  const newVendedor = {
    legajo: legajo,
    nombre_vendedor: nombre_vendedor,
    id_barrio:id_barrio,
    fecha_ingreso: fecha_ingreso,
  };
  vendedoresController.crearVendedor(newVendedor);
  res.status(201).json(newVendedor);
});

vendedoresRouters.delete("/:legajo", async (req, res) => {
  const legajo = req.params.legajo;
  const eliminado = await vendedoresController.getByLegajo(legajo);
  await vendedoresController.deleteByLegajo(legajo);
  if (eliminado === null) {
    res.status(404).json({ error: "Vendedor no encontrado" });
  } else {
    res.status(202).json(eliminado);
  }
});

vendedoresRouters.put("/:legajo_vendedor", async (req, res) => {
  const legajo = parseInt(req.params.legajo_vendedor);
  const { body } = req;
  const nombre_vendedor = body.nombre_vendedor;
  const id_barrio = body.id_barrio;
  const fecha_ingreso = body.fecha_ingreso;
  const data = {
    legajo: legajo,
    nombre_vendedor: nombre_vendedor,
    id_barrio: id_barrio,
    fecha_ingreso: fecha_ingreso,
  };
  const resultado = await vendedoresController.modificarVendedor(data);
  if (resultado === data) {
    res.status(201).json(data);
  } else {
    res.status(404).json(resultado);
  }
});

vendedoresRouters.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = vendedoresRouters;
