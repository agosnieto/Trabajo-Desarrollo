const { Router } = require("express");
const barriosRouters = Router();
const BarriosController = require("../controllers/barrios.controller.js");
const barriosController = new BarriosController();

barriosRouters.get("/", async (req, res) => {
  const data = await barriosController.getAll();
  res.status(200).json(data);
});

barriosRouters.get("/:id_barrio", async (req, res) => {
  const id_barrio = req.params.id_barrio;
  const data = await barriosController.getById(id_barrio);
  if (data === null) {
    res.status(404).json({
      error: "No existe un barrio con ese id",
    });
  } else {
    res.status(200).json(data);
  }
});


barriosRouters.put("/:id_barrio", async (req, res) => {
  const id_barrio = parseInt(req.params.id_barrio);
  const { body } = req;
  const nombre_barrio = body.nombre_barrio;
  const data = {
    id_barrio: id_barrio,
    nombre_barrio: nombre_barrio,
  };
  const resultado = await barriosController.modificarBarrios(data);
  if (resultado === data) {
    res.status(201).json(data);
  } else {
    res.status(404).json(resultado);
  }
});

barriosRouters.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = barriosRouters;
