const { Router } = require("express");
const ventaController = require("../controllers/venta.controller.js");

const ventaRouter = new Router();

ventaRouter.get("/", async (req, res) => {
  const data = await ventaController.getAll();
  return data ? res.status(200).json(data) : res.status(404).json(data);
});

ventaRouter.get("/:nroVenta", async (req, res) => {
  const nroventa = req.params.nroVenta;
  const venta = await ventaController.getByNro_Venta(nroventa);
  return venta
    ? res.status(200).json(venta)
    : res.status(404).json({
        nro_venta: nroventa,
        encontrado: venta,
        message: "Venta no encontrada",
      });

});
ventaRouter.post("/", async (req, res) => {
  const newVenta = {
    Nro_Venta: req.body.nro_venta,
    Cliente_Cuil: req.body.cliente_cuil,
    Vendedor_Leg: req.body.vendedor_leg,
    Articulo_Id: req.body.articulo_id,
    Fecha_Venta: req.body.fecha_venta,
    id_sucursal: req.body.id_sucursal,
  };
  const resultado = await ventaController.createVenta(newVenta);
  res.status(201).json(resultado);
});

ventaRouter.put("/:nro_venta", async (req, res) => {
  const nro_venta = req.params.nro_venta;
  const nuevosValores = {
    Cliente_Cuil: req.body.cliente_cuil,
    Vendedor_Leg: req.body.vendedor_leg,
    Articulo_Id: req.body.articulo_id,
    Fecha_Venta: req.body.fecha_venta,
    id_sucursal: req.body.id_sucursal,
  };
  const updatedVenta = await ventaController.updateVenta(
    nro_venta,
    nuevosValores
  );
  if (updatedVenta === 404) {
    return res.status(404).json({ message: "Venta no encontrada" });
  }
  //Si devuelve 1 significa que se actualizo 1 registro.
  const [aux] = updatedVenta;
  if (aux === 1) {
    return res.status(200).json(nuevosValores);
  }
  return res.status(500).json({ message: "Error interno" });
});


ventaRouter.delete("/:nro_venta", async (req, res) => {
  const nro_venta = req.params.nro_venta;
  const venta = await ventaController.getByNro_Venta(nro_venta);
  if (!venta) {
    return res.status(404).json({ message: "Venta no encontrada" });
  }
  const deletedVenta = await ventaController.deleteVenta(nro_venta);
  //si deletedVenta es 1 significa que se borro 1 registro
  if (deletedVenta === 1) {
    return res.status(200).json(venta);
  }
  return res.status(500).json({ message: "Error interno" });
});

ventaRouter.use("/", (req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = ventaRouter;
