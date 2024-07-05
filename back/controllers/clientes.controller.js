const sequelize = require('../data/database.js');

class ClientesController {
    async getAll() {
        return await sequelize.models.Clientes.findAll({
            attributes: ['Cuil', 'Nombre', 'id_tipo_cliente', 'Fecha_nacimiento'],
            order: [['Cuil', 'ASC']]
        });
    }

    async getByCuil(cuil) {
        return await sequelize.models.Clientes.findOne({
            attributes: ['Cuil', 'Nombre', 'id_tipo_cliente', 'Fecha_nacimiento'],
            where: { Cuil: cuil }
        });
    }

    async crearCliente(data) {
        try {
            return await sequelize.models.Clientes.create(data);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteByCuil(cuil) {
        try {
            return await sequelize.models.Clientes.destroy({ where: { Cuil: cuil } });
        } catch (error) {
            console.error(error);
        }
    }

    async modificarCliente(data) {
        const cliente = await this.getByCuil(data.Cuil);
        if (!cliente) {
            return { error: "Cliente no encontrado" };
        }
        await sequelize.models.Clientes.update(data, { where: { Cuil: data.Cuil } });
        return data;
    }
}

module.exports = ClientesController;
