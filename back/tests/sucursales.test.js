const sequelize = require('../data/database.js');
const SucursalesController = require('../controllers/sucursales.controller.js');
const controller = new SucursalesController();

jest.mock('../data/database.js', () => ({
    models: {
        Sucursales: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
        }
    }
}));

describe('SucursalesController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all sucursales', async () => {
            const sucursales = [{ id_sucursal: 1, direc_sucursal: 'Address 1' }];
            sequelize.models.Sucursales.findAll.mockResolvedValue(sucursales);

            const result = await controller.getAll();

            expect(sequelize.models.Sucursales.findAll).toHaveBeenCalledWith({
                attributes: ['id_sucursal', 'direc_sucursal'],
                order: [['id_sucursal', 'ASC']]
            });
            expect(result).toEqual(sucursales);
        });
    });

    describe('getById', () => {
        it('should return a sucursal by id_sucursal', async () => {
            const sucursal = { id_sucursal: 1, direc_sucursal: 'Address 1' };
            sequelize.models.Sucursales.findOne.mockResolvedValue(sucursal);

            const result = await controller.getById(1);

            expect(sequelize.models.Sucursales.findOne).toHaveBeenCalledWith({
                attributes: ['id_sucursal', 'direc_sucursal'],
                where: { id_sucursal: 1 }
            });
            expect(result).toEqual(sucursal);
        });
    });

    describe('modificarSucursales', () => {
        it('should modify an existing sucursal', async () => {
            const data = { id_sucursal: 1, direc_sucursal: 'New Address' };
            sequelize.models.Sucursales.findOne.mockResolvedValue(data);
            sequelize.models.Sucursales.update.mockResolvedValue([1]);

            const result = await controller.modificarSucursales(data);

            expect(sequelize.models.Sucursales.findOne).toHaveBeenCalledWith({
                attributes: ['id_sucursal', 'direc_sucursal'],
                where: { id_sucursal: data.id_sucursal }
            });
            expect(sequelize.models.Sucursales.update).toHaveBeenCalledWith(
                {
                    id_sucursal: data.id_sucursal,
                    direc_sucursal: data.direc_sucursal
                },
                { where: { id_sucursal: data.id_sucursal } }
            );
            expect(result).toEqual(data);
        });

        it('should return an error if sucursal not found', async () => {
            const data = { id_sucursal: 1, direc_sucursal: 'New Address' };
            sequelize.models.Sucursales.findOne.mockResolvedValue(null);

            const result = await controller.modificarSucursales(data);

            expect(result).toEqual({ error: 'Sucursal no encontrada' });
        });
    });
});
