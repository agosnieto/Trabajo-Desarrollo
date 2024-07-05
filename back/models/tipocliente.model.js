const { DataTypes } = require('sequelize');

const TipoClienteAttributes = { 
    id_tipo_cliente:{
        field:'id_tipo_cliente',
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        unique:true,
        validate:{
            notEmpty:{
                args:true,
                msg: "El Id del cliente es necesario"
            }
        }
    },

    descripcion:{
        field:'descripcion',
        type: DataTypes.CHAR,
        allowNull:false,
        validate:{
            notEmpty:{
                args:true,
                msg:"El nombre del cliente es necesario"
            }
        }

    },

};

const TipoClienteOptions = {
    timestamps: false
};

const TipoClienteModel ={
    TipoClienteAttributes,
    TipoClienteOptions
};

module.exports = TipoClienteModel;