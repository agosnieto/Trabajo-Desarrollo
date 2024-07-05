const sequelize = require("../data/database.js");

class ArticulosController {
  async getAll() {
    const resultado = await sequelize.models.Articulos.findAll({
      attributes: ["id_articulo", "nombre_articulo", "fecha_compra","id_tipo_articulo"],
      order: [["id_articulo", "ASC"]],
    });
    return resultado;
  }

  async getById(id_articulo) {
    const resultado = await sequelize.models.Articulos.findOne({
      attributes: ["id_articulo", "nombre_articulo", "fecha_compra","id_tipo_articulo"],
      where: { id_articulo: id_articulo },
    });
    return resultado;
  }

  async crearArticulo(data) {
    try {
      const resultado = await sequelize.models.Articulos.create(data);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id_articulo) {
    try {
      const resultado = await sequelize.models.Articulos.destroy({
        where: { id_articulo: id_articulo },
      });
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }

  async modificarArticulo(data) {
    const articulo = await this.getById(data.id_articulo);
    if (articulo === null) {
      return { error: "Articulo no encontrado" };
    }
    const updateArticulo = await sequelize.models.Articulos.update(
      {
        id_articulo: data.id_articulo,
        nombre_articulo: data.nombre_articulo,
        fecha_compra: data.fecha_compra,
        id_tipo_articulo: data.id_tipo_articulo
      },
      { where: { id_articulo: data.id_articulo } }
    );
    return data;
  }
}

module.exports = ArticulosController;
