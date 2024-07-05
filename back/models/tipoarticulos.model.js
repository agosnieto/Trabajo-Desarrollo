const { DataTypes } = require('sequelize');

const TipoArticulosAttributes = { 
    id_tipo_articulo:{
        field:'id_tipo_articulo',
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        unique:true,
        validate:{
            notEmpty:{
                args:true,
                msg: "El Id del articulo es necesario"
            }
        }
    },

    nombre_tipo_articulo:{
        field:'nombre_tipo_articulo',
        type: DataTypes.CHAR,
        allowNull:false,
        validate:{
            notEmpty:{
                args:true,
                msg:"El nombre del articulo es necesario"
            }
        }

    },

};

const TipoArticulosOptions = {
    timestamps: false
};

const TipoArticulosModel ={
    TipoArticulosAttributes,
    TipoArticulosOptions
};

module.exports = TipoArticulosModel;