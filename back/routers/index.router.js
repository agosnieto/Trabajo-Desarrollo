const {Router} = require('express');

const ventaRouter = require("./venta.router.js");
const vendedoresRouter = require('./vendedores.router.js');
const clienteRouters = require('./cliente.router.js');
const articulosRouter = require('./articulos.router.js');
const barriosRouter = require('./barrios.router.js');
const tipoclientesRouter = require('./tipoclientes.router.js');
const tipoarticulosRouter = require('./tipoarticulos.router.js');
const sucursalesRouter = require('./sucursales.router.js');


const indexRouter = Router();

indexRouter.use("/ventas", ventaRouter);
indexRouter.use("/clientes", clienteRouters);
indexRouter.use("/vendedores", vendedoresRouter);
indexRouter.use("/articulos", articulosRouter);
indexRouter.use("/barrios", barriosRouter);
indexRouter.use("/tipoclientes", tipoclientesRouter);
indexRouter.use("/tipoarticulos", tipoarticulosRouter);
indexRouter.use("/sucursales", sucursalesRouter);

module.exports = indexRouter;
