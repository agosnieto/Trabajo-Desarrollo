const sequelize = require('../data/database.js');
const TipoClienteController = require('../controllers/tipocliente.controller.js');
const controller = new TipoClienteController();

jest.mock('../data/database.js', () => ({
    models: {
        TipoClientes: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
        }
    }
}));

describe('TipoClienteController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all tipo de clientes', async () => {
            const tipoClientes = [{ id_tipo_cliente: 1, descripcion: 'Cliente 1' }];
            sequelize.models.TipoClientes.findAll.mockResolvedValue(tipoClientes);

            const result = await controller.getAll();

            expect(sequelize.models.TipoClientes.findAll).toHaveBeenCalledWith({
                attributes: ['id_tipo_cliente', 'descripcion'],
                order: [['id_tipo_cliente', 'ASC']]
            });
            expect(result).toEqual(tipoClientes);
        });
    });

    describe('getById', () => {
        it('should return a tipo de cliente by id_tipo_cliente', async () => {
            const tipoCliente = { id_tipo_cliente: 1, descripcion: 'Cliente 1' };
            sequelize.models.TipoClientes.findOne.mockResolvedValue(tipoCliente);

            const result = await controller.getById(1);

            expect(sequelize.models.TipoClientes.findOne).toHaveBeenCalledWith({
                attributes: ['id_tipo_cliente', 'descripcion'],
                where: { id_tipo_cliente: 1 }
            });
            expect(result).toEqual(tipoCliente);
        });
    });

    describe('modificarTipoCliente', () => {
        it('should modify an existing tipo de cliente', async () => {
            const data = { id_tipo_cliente: 1, descripcion: 'Nuevo Cliente' };
            sequelize.models.TipoClientes.findOne.mockResolvedValue(data);
            sequelize.models.TipoClientes.update.mockResolvedValue([1]);

            const result = await controller.modificarTipoCliente(data);

            expect(sequelize.models.TipoClientes.findOne).toHaveBeenCalledWith({
                attributes: ['id_tipo_cliente', 'descripcion'],
                where: { id_tipo_cliente: data.id_tipo_cliente }
            });
            expect(sequelize.models.TipoClientes.update).toHaveBeenCalledWith(
                {
                    id_tipo_cliente: data.id_tipo_cliente,
                    descripcion: data.descripcion
                },
                { where: { id_tipo_cliente: data.id_tipo_cliente } }
            );
            expect(result).toEqual(data);
        });

        it('should return an error if tipo de cliente not found', async () => {
            const data = { id_tipo_cliente: 1, descripcion: 'Nuevo Cliente' };
            sequelize.models.TipoClientes.findOne.mockResolvedValue(null);

            const result = await controller.modificarTipoCliente(data);

            expect(result).toEqual({ error: 'Tipo de cliente no encontrado' });
        });
    });
});
