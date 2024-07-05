const sequelize = require("../data/database.js");

const getAll = async () => {
  try {
    const resultado = await sequelize.models.Ventas.findAll({
      attributes: [
        "Nro_venta",
        "Cliente_cuil",
        "Vendedor_leg",
        "Articulo_id",
        "Fecha_venta",
        "id_sucursal",
      ],
      order: [["Nro_venta", "ASC"]],
    });
    return resultado;
  } catch (error) {
    return error.message;
  }
};
const getByNro_Venta = async (nro_venta) => {
  try {
    const resultado = await sequelize.models.Ventas.findOne({
      where: { nro_venta: nro_venta },
      attributes: [
        "Nro_venta",
        "Cliente_cuil",
        "Vendedor_leg",
        "Articulo_id",
        "Fecha_venta",
        "id_sucursal",
      ],
    });
    return resultado;
  } catch (error) {
    return error.message;
  }
};
const createVenta = async (data) => {
  try {
    //data debe estar ya pre analizada por el router.
    console.log('Esta es la data que le llega al Create',data)
    const resultado = await sequelize.models.Ventas.create(data);
    return resultado;
  } catch (error) {
    return error.message;
  }
};
const updateVenta = async (nro_venta, data) => {
  try {
    //verificar si la venta existe
    const venta = await getByNro_Venta(nro_venta);
    if (!venta) {
      return 404;
    }
    const updatedVenta = await sequelize.models.Ventas.update(data, {
      where: { nro_venta: nro_venta },
    });
    //si updatedVenta es 1 significa que se actualizo correctamente
    return updatedVenta;
  } catch (error) {
    return error.message;
  }
};
const deleteVenta = async (nro_venta) => {
  try {
    //no hace falta verificar si la venta existe porque ya lo hace el router
    const deletedVenta = await sequelize.models.Ventas.destroy({
      where: { Nro_Venta: nro_venta },
    });
    return deletedVenta;
  } catch (error) {
    return error.message;
  }
};

const ventaController = {
  getAll,
  getByNro_Venta,
  createVenta,
  updateVenta,
  deleteVenta,
};

module.exports = ventaController;
