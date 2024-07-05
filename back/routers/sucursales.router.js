const { Router } = require("express");
const sucursalesRouters = Router();
const SucursalesController = require("../controllers/sucursales.controller.js");
const sucursalesController = new SucursalesController();

sucursalesRouters.get("/", async (req, res) => {
  const data = await sucursalesController.getAll();
  res.status(200).json(data);
});

sucursalesRouters.get("/:id_sucursal", async (req, res) => {
  const id_sucursal = req.params.id_sucursal;
  const data = await sucursalesController.getById(id_sucursal);
  if (data === null) {
    res.status(404).json({
      error: "No existe una sucursal con ese id",
    });
  } else {
    res.status(200).json(data);
  }
});

sucursalesRouters.put("/:id_sucursal", async (req, res) => {
  const id_sucursal = parseInt(req.params.id_sucursal);
  const { body } = req;
  const direc_sucursal = body.direc_sucursal;
  const data = {
    id_sucursal: id_sucursal,
    direc_sucursal: direc_sucursal,
  };
  const resultado = await sucursalesController.modificarSucursales(data);
  if (resultado === data) {
    res.status(201).json(data);
  } else {
    res.status(404).json(resultado);
  }
});

sucursalesRouters.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = sucursalesRouters;
