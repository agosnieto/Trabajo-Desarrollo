const { DataTypes } = require('sequelize');

const BarriosAttributes = { 
    id_barrio:{
        field:'id_barrio',
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
    nombre_barrio:{
        field:'nombre_barrio',
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

const BarriosOptions = {
    timestamps: false
};

const BarriosModel ={
    BarriosAttributes,
    BarriosOptions
};

module.exports = BarriosModel;