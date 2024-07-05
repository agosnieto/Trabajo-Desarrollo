const { DataTypes } = require('sequelize');

const ClientesAttributes = {
  Cuil: {
    field: 'cuil_cliente',
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "El cuil del cliente es necesario"
      }
    }
  },
  Nombre: {
    field: 'nombre_cliente',
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "El nombre y apellido del cliente son necesarios"
      }
    }
  },
  id_tipo_cliente: {
    field: 'id_tipo_cliente',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoClientes',
      key: 'id_tipo_cliente',
    },
    onDelete: 'RESTRICT', // No permitir eliminar tipo de cliente si tiene clientes
  },
  Fecha_nacimiento: {
    field: 'fecha_nacimiento',
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "La fecha de nacimiento del cliente es necesaria"
      }
    }
  }
};

const ClientesOptions = {
  timestamps: false
};

const ClientesModel = {
  ClientesAttributes,
  ClientesOptions
};

module.exports = ClientesModel;
