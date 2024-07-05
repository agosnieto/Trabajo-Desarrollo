const sequelize = require("../data/database.js");

class TipoClienteController {
  async getAll() {
    const resultado = await sequelize.models.TipoClientes.findAll({
      attributes: ["id_tipo_cliente", "descripcion"],
      order: [["id_tipo_cliente", "ASC"]],
    });
    return resultado;
  }

  async getById(id_tipo_cliente) {
    const resultado = await sequelize.models.TipoClientes.findOne({
      attributes: ["id_tipo_cliente", "descripcion"],
      where: { id_tipo_cliente: id_tipo_cliente },
    });
    return resultado;
  }

  

  async modificarTipoCliente(data) {
    const tipocliente = await this.getById(data.id_tipo_cliente);
    if (tipocliente === null) {
      return { error: "Tipo de cliente no encontrado" };
    }
    const updateTipoCliente = await sequelize.models.TipoClientes.update(
      {
        id_tipo_cliente: data.id_tipo_cliente,
        descripcion: data.descripcion,
      },
      { where: { id_tipo_cliente: data.id_tipo_cliente } }
    );
    return data;
  }
}

module.exports = TipoClienteController;