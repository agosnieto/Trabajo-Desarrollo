const sequelize = require("../data/database.js");

class TipoArticulosController {
  async getAll() {
    const resultado = await sequelize.models.TipoArticulos.findAll({
      attributes: ["id_tipo_articulo", "nombre_tipo_articulo"],
      order: [["id_tipo_articulo", "ASC"]],
    });
    return resultado;
  }

  async getById(id_tipo_articulo) {
    const resultado = await sequelize.models.TipoArticulos.findOne({
      attributes: ["id_tipo_articulo", "nombre_tipo_articulo"],
      where: { id_tipo_articulo: id_tipo_articulo },
    });
    return resultado;
  }

  

  async modificarTipoArticulo(data) {
    const tipoarticulo = await this.getById(data.id_tipo_articulo);
    if (tipoarticulo === null) {
      return { error: "Tipo de articulo no encontrado" };
    }
    const updateTipoArticulo = await sequelize.models.TipoArticulos.update(
      {
        id_tipo_articulo: data.id_tipo_articulo,
        nombre_tipo_articulo: data.nombre_tipo_articulo,
      },
      { where: { id_tipo_articulo: data.id_tipo_articulo } }
    );
    return data;
  }
}

module.exports = TipoArticulosController;