const sequelize = require('../data/database.js');

class VendedoresController{
    async getAll(){
        const resultado = await sequelize.models.Vendedores.findAll({
            attributes:[
                'legajo',
                'nombre_vendedor',
                'id_barrio',
                'fecha_ingreso'
            ],
            order: [['legajo', 'ASC']]
        })
        return resultado;
    }

    async getByLegajo(legajo){
        const resultado = await sequelize.models.Vendedores.findOne({
            attributes:[
                'legajo',
                'nombre_vendedor',
                'id_barrio',
                'fecha_ingreso'
            ],
            where: {legajo: legajo}
        })
        return resultado
    }

    async crearVendedor(data){
        try {
            const resultado = await sequelize.models.Vendedores.create(data)
            return resultado
        } catch (error) {
            const resultado = null
            return resultado
        }
        
    }
    
    async deleteByLegajo(legajo){
        try {
            const resultado = await sequelize.models.Vendedores.destroy({
                where:{legajo: legajo}
            })
            return resultado
        } catch (error) {
            console.log(error);
        }
    }

    async modificarVendedor(data){
        const vendedor = await this.getByLegajo(data.legajo)
        if(vendedor === null){
            return {error: "Vendedor no encontrado"}
        }
        const updateVendedor = await sequelize.models.Vendedores.update(
            {
            legajo: data.legajo,
            nombre_vendedor: data.nombre_vendedor,
            id_barrio:data.id_barrio,
            fecha_ingreso: data.fecha_ingreso
            },
        {where: {legajo: data.legajo}})
        return data
    }
}

module.exports = VendedoresController;