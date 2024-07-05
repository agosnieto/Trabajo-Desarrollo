const { DataTypes } = require('sequelize');

const SucursalesAttributes = { 
    id_sucursal:{
        field:'id_sucursal',
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
        unique:true,
        validate:{
            notEmpty:{
                args:true,
                msg: "x"
            }
        }
    },
    direc_sucursal:{
        field:'direc_sucursal',
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:{
                args:true,
                msg: "x"
            }
        }
    }
};

const SucursalesOptions = {
    timestamps: false
};

const SucursalesModel ={
    SucursalesAttributes,
    SucursalesOptions
};

module.exports = SucursalesModel;