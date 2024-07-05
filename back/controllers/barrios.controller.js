const sequelize = require("../data/database.js");

class BarriosController {
  async getAll() {
    const resultado = await sequelize.models.Barrios.findAll({
      attributes: ["id_barrio", "nombre_barrio"],
      order: [["id_barrio", "ASC"]],
    });
    return resultado;
  }

  async getById(id_barrio) {
    const resultado = await sequelize.models.Barrios.findOne({
      attributes: ["id_barrio", "nombre_barrio"],
      where: { id_barrio: id_barrio },
    });
    return resultado;
  }

  

  async modificarBarrios(data) {
    const barrio = await this.getById(data.id_barrio);
    if (barrio === null) {
      return { error: "Barrio no encontrado" };
    }
    const updateBarrio = await sequelize.models.Barrios.update(
      {
        id_barrio: data.id_barrio,
        nombre_barrio: data.nombre_barrio,
      },
      { where: { id_barrio: data.id_barrio } }
    );
    return data;
  }
}

module.exports = BarriosController;