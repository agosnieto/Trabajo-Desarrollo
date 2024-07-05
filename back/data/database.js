const { Sequelize } = require("sequelize");
const ClientesModel = require('../models/clientes.model.js');
const VentasModel = require("../models/ventas.models.js");
const VendedoresModel = require("../models/vendedores.model.js");
const ArticulosModel = require('../models/articulos.model.js');
const SucursalesModel = require('../models/sucursales.model.js');
const TipoClienteModel = require('../models/tipocliente.model.js');
const BarriosModel = require('../models/barrios.model.js');
const TipoArticulosModel = require('../models/tipoarticulos.model.js');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.db'
});

// Define los modelos
const Clientes = sequelize.define(
    'Clientes',
    ClientesModel.ClientesAttributes,
    ClientesModel.ClientesOptions
);

const Ventas = sequelize.define(
    'Ventas',
    VentasModel.ventasAttributes,
    VentasModel.ventasOptions
);

const Vendedores = sequelize.define(
    'Vendedores',
    VendedoresModel.VendedoresAttributes,
    VendedoresModel.VendedoresOptions
);

const Articulos = sequelize.define(
    'Articulos',
    ArticulosModel.ArticulosAttributes,
    ArticulosModel.ArticulosOptions
);

const Sucursales = sequelize.define(
    'Sucursales',
    SucursalesModel.SucursalesAttributes,
    SucursalesModel.SucursalesOptions
);

const Barrios = sequelize.define(
    'Barrios',
    BarriosModel.BarriosAttributes,
    BarriosModel.BarriosOptions
);

const TipoArticulos = sequelize.define(
    'TipoArticulos',
    TipoArticulosModel.TipoArticulosAttributes,
    TipoArticulosModel.TipoArticulosOptions
);

const TipoClientes = sequelize.define(
    'TipoClientes',
    TipoClienteModel.TipoClienteAttributes,
    TipoClienteModel.TipoClienteOptions
);

// Definir las asociaciones entre los modelos
// Ejemplo de asociaciones, ajusta según tus relaciones específicas
Clientes.belongsTo(TipoClientes, { foreignKey: 'id_tipo_cliente' });
TipoClientes.hasMany(Clientes, { foreignKey: 'id_tipo_cliente' });

Ventas.belongsTo(Sucursales, { foreignKey: 'id_sucursal' });
Sucursales.hasMany(Ventas, { foreignKey: 'id_sucursal' });

Ventas.belongsTo(Clientes, { foreignKey: 'Cliente_cuil', onDelete: 'CASCADE' });
Clientes.hasMany(Ventas, { foreignKey: 'Cliente_cuil' });

Ventas.belongsTo(Vendedores, { foreignKey: 'Vendedor_leg', onDelete: 'RESTRICT' });
Vendedores.hasMany(Ventas, { foreignKey: 'Vendedor_leg' });

Ventas.belongsTo(Articulos, { foreignKey: 'Articulo_id', onDelete: 'RESTRICT' });
Articulos.hasMany(Ventas, { foreignKey: 'Articulo_id' });

Vendedores.belongsTo(Barrios, { foreignKey: 'id_barrio' });
Barrios.hasMany(Vendedores, { foreignKey: 'id_barrio' });

Articulos.belongsTo(TipoArticulos, { foreignKey: 'id_tipo_articulo' });
TipoArticulos.hasMany(Articulos, { foreignKey: 'id_tipo_articulo' });

// Sincronizar modelos con la base de datos
try {
    sequelize.sync({ force: false });
    console.log("Base de datos sincronizada");
} catch (error) {
    console.log("Fallo la sincronizacion de la base de datos", error);
}

module.exports = sequelize;