const sequelize = require("../data/database.js");

class SucursalesController {
  async getAll() {
    const resultado = await sequelize.models.Sucursales.findAll({
      attributes: ["id_sucursal", "direc_sucursal"],
      order: [["id_sucursal", "ASC"]],
    });
    return resultado;
  }

  async getById(id_sucursal) {
    const resultado = await sequelize.models.Sucursales.findOne({
      attributes: ["id_sucursal", "direc_sucursal"],
      where: { id_sucursal: id_sucursal },
    });
    return resultado;
  }

  

  async modificarSucursales(data) {
    const sucursal = await this.getById(data.id_sucursal);
    if (sucursal === null) {
      return { error: "Sucursal no encontrada" };
    }
    const updateSucursal = await sequelize.models.Sucursales.update(
      {
        id_sucursal: data.id_sucursal,
        direc_sucursal: data.direc_sucursal,
      },
      { where: { id_sucursal: data.id_sucursal } }
    );
    return data;
  }
}

module.exports = SucursalesController;