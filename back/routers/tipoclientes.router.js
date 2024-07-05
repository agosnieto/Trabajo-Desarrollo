const { Router } = require("express");
const tipoclientesRouters = Router();
const TipoClientesController = require("../controllers/tipocliente.controller.js");
const tipoclientesController = new TipoClientesController();

tipoclientesRouters.get("/", async (req, res) => {
  const data = await tipoclientesController.getAll();
  res.status(200).json(data);
});

tipoclientesRouters.get("/:id_tipo_cliente", async (req, res) => {
  const id_tipo_cliente = req.params.id_tipo_cliente;
  const data = await tipoclientesController.getById(id_tipo_cliente);
  if (data === null) {
    res.status(404).json({
      error: "No existe un tipo de cliente con ese id",
    });
  } else {
    res.status(200).json(data);
  }
});

tipoclientesRouters.put("/:id_tipo_cliente", async (req, res) => {
  const id_tipo_cliente = parseInt(req.params.id_tipo_cliente);
  const { body } = req;
  const descripcion = body.descripcion;
  const data = {
    id_tipo_cliente: id_tipo_cliente,
    descripcion: descripcion,
  };
  const resultado = await tipoclientesController.modificarTipoCliente(data);
  if (resultado === data) {
    res.status(201).json(data);
  } else {
    res.status(404).json(resultado);
  }
});

tipoclientesRouters.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = tipoclientesRouters;