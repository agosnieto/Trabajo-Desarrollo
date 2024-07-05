const { DataTypes } = require('sequelize');

const ArticulosAttributes = { 
    id_articulo:{
        field:'id_articulo',
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
    nombre_articulo:{
        field:'nombre_articulo',
        type: DataTypes.CHAR,
        allowNull:false,
        validate:{
            notEmpty:{
                args:true,
                msg:"El nombre del articulo es necesario"
            }
        }

    },
    fecha_compra:{
        field:'fecha_compra',
        type:DataTypes.DATE,
        allowNull:false
    }
    ,
    id_tipo_articulo:{
        field:'id_tipo_articulo',
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:{
                args:true,
                msg: "El tipo de Id del articulo es necesario"
            }
        }
    },
};

const ArticulosOptions = {
    timestamps: false
};

const ArticulosModel ={
    ArticulosAttributes,
    ArticulosOptions
};

module.exports = ArticulosModel;