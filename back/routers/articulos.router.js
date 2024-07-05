const { Router } = require("express");
const articulosRouters = Router();
const ArticulosController = require("../controllers/articulos.controller.js");
const articulosController = new ArticulosController();

articulosRouters.get("/", async (req, res) => {
  const data = await articulosController.getAll();
  res.status(200).json(data);
});

articulosRouters.get("/:id_articulo", async (req, res) => {
  const id_articulo = req.params.id_articulo;
  const data = await articulosController.getById(id_articulo);
  if (data === null) {
    res.status(404).json({
      error: "No existe un articulo con ese id",
    });
  } else {
    res.status(200).json(data);
  }
});

articulosRouters.post("/", async (req, res) => {
  const { body } = req;
  const { id_articulo, nombre_articulo,id_tipo_articulo, fecha_compra } = body;
  const newArticulo = {
    id_articulo: id_articulo,
    nombre_articulo: nombre_articulo,
    id_tipo_articulo:id_tipo_articulo,
    fecha_compra: fecha_compra,
  };
  articulosController.crearArticulo(newArticulo);
  res.status(201).json(newArticulo);
});

articulosRouters.delete("/:id_articulo", async (req, res) => {
  const id_articulo = req.params.id_articulo;
  const eliminado = await articulosController.getById(id_articulo);
  await articulosController.deleteById(id_articulo);
  if (eliminado === null) {
    res.status(404).json({ error: "Articulo no encontrado" });
  } else {
    res.status(202).json(eliminado);
  }
});

articulosRouters.put("/:id_articulo", async (req, res) => {
  const id_articulo = parseInt(req.params.id_articulo);
  const { body } = req;
  const nombre_articulo = body.nombre_articulo;;
  const fecha_compra = body.fecha_compra;
  const id_tipo_articulo = body.id_tipo_articulo;
  const data = {
    id_articulo: id_articulo,
    nombre_articulo: nombre_articulo,
    fecha_compra: fecha_compra,
    id_tipo_articulo:id_tipo_articulo,
  };
  const resultado = await articulosController.modificarArticulo(data);
  if (resultado === data) {
    res.status(201).json(data);
  } else {
    res.status(404).json(resultado);
  }
});

articulosRouters.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = articulosRouters;
