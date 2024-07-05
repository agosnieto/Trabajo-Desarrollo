const { Router } = require("express");
const tipoarticulosRouters = Router();
const TipoArticulosController = require("../controllers/tipoarticulos.controller.js");
const tipoarticulosController = new TipoArticulosController();

tipoarticulosRouters.get("/", async (req, res) => {
  const data = await tipoarticulosController.getAll();
  res.status(200).json(data);
});

tipoarticulosRouters.get("/:id_tipo_articulo", async (req, res) => {
  const id_tipo_articulo = req.params.id_tipo_articulo;
  const data = await tipoarticulosController.getById(id_tipo_articulo);
  if (data === null) {
    res.status(404).json({
      error: "No existe un tipo de articulo con ese id",
    });
  } else {
    res.status(200).json(data);
  }
});

tipoarticulosRouters.put("/:id_tipo_articulo", async (req, res) => {
  const id_tipo_articulo = parseInt(req.params.id_tipo_articulo);
  const { body } = req;
  const nombre_tipo_articulo = body.nombre_tipo_articulo;
  const data = {
    id_tipo_articulo: id_tipo_articulo,
    nombre_tipo_articulo: nombre_tipo_articulo,
  };
  const resultado = await tipoarticulosController.modificarTipoArticulo(data);
  if (resultado === data) {
    res.status(201).json(data);
  } else {
    res.status(404).json(resultado);
  }
});

tipoarticulosRouters.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = tipoarticulosRouters;