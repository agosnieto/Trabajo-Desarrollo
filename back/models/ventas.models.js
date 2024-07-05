const { DataTypes } = require("sequelize");

const ventasAttributes = {
  Nro_Venta: {
    field: "Nro_venta",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Cliente_Cuil: {
    field: "Cliente_cuil",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clientes',
      key: 'cuil_cliente',
    },
    onDelete: 'CASCADE', // Eliminar ventas si se elimina el cliente
    validate: {
      notEmpty: {
        args: true,
        msg: "El campo cliente_cuil no puede estar vacío",
      },
    },
  },
  Vendedor_Leg: {
    field: "Vendedor_leg",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Vendedores',
      key: 'legajo_vendedor',
    },
    onDelete: 'RESTRICT', // No permitir eliminar vendedor si tiene ventas
    validate: {
      notEmpty: {
        args: true,
        msg: "El campo vendedor_leg no puede estar vacío",
      },
    },
  },
  Articulo_Id: {
    field: "Articulo_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Articulos',
      key: 'id_articulo',
    },
    onDelete: 'RESTRICT', // No permitir eliminar artículo si está en ventas
    validate: {
      notEmpty: {
        args: true,
        msg: "El campo Articulo_id no puede estar vacío",
      },
    },
  },
  Fecha_Venta: {
    field: "Fecha_venta",
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "El campo fecha_venta no puede estar vacío",
      },
    },
  },
  id_sucursal: {
    field: "id_sucursal",
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Sucursales',
      key: 'id_sucursal',
    },
    onDelete: 'RESTRICT', // No permitir eliminar sucursal si tiene ventas
    validate: {
      notEmpty: {
        args: true,
        msg: "El campo id_sucursal no puede estar vacío",
      },
    },
  },
};

const ventasOptions = {
  timestamps: false,
};

const ventasModel = {
  ventasAttributes,
  ventasOptions,
};

module.exports = ventasModel;
