const { DataTypes } = require("sequelize");

const VendedoresAttributes = {
    legajo: {
        field:'legajo',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_vendedor: {
        field:'nombre_vendedor',
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: {
              args: true,
              msg: "El Nombre del vendedor es requerido",
            },
        }
    },
    id_barrio: {
        field:'id_barrio',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
              args: true,
              msg: "requerida",
            },
        }
    },
    fecha_ingreso: {
        field:'fecha_ingreso',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
              args: true,
              msg: "La Fecha es requerida",
            },
    }},
}

const VendedoresOptions = {
    timestamps: false
}

const VendedoresModel = {
    VendedoresAttributes,
    VendedoresOptions
}

module.exports = { VendedoresModel };
