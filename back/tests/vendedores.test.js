const sequelize = require('../data/database.js');
const VendedoresController = require('../controllers/vendedores.controller.js');
const controller = new VendedoresController();

jest.mock('../data/database.js', () => ({
    models: {
        Vendedores: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
            update: jest.fn()
        }
    }
}));

describe('VendedoresController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('deberia devolver todos los vendedores', async () => {
            const vendedores = [{ legajo: 1, nombre_vendedor: 'John Doe', id_barrio: 1, fecha_ingreso: '2020-01-01' }];
            sequelize.models.Vendedores.findAll.mockResolvedValue(vendedores);

            const result = await controller.getAll();

            expect(sequelize.models.Vendedores.findAll).toHaveBeenCalledWith({
                attributes: ['legajo', 'nombre_vendedor', 'id_barrio', 'fecha_ingreso'],
                order: [['legajo', 'ASC']]
            });
            expect(result).toEqual(vendedores);
        });
    });

    describe('getByLegajo', () => {
        it('deberia devolver un vendedor by legajo', async () => {
            const vendedor = { legajo: 1, nombre_vendedor: 'John Doe', id_barrio: 1, fecha_ingreso: '2020-01-01' };
            sequelize.models.Vendedores.findOne.mockResolvedValue(vendedor);

            const result = await controller.getByLegajo(1);

            expect(sequelize.models.Vendedores.findOne).toHaveBeenCalledWith({
                attributes: ['legajo', 'nombre_vendedor', 'id_barrio', 'fecha_ingreso'],
                where: { legajo: 1 }
            });
            expect(result).toEqual(vendedor);
        });
    });

    describe('crearVendedor', () => {
        it('creo a un vendedor', async () => {
            const data = { legajo: 1, nombre_vendedor: 'John Doe', id_barrio: 1, fecha_ingreso: '2020-01-01' };
            sequelize.models.Vendedores.create.mockResolvedValue(data);

            const result = await controller.crearVendedor(data);

            expect(sequelize.models.Vendedores.create).toHaveBeenCalledWith(data);
            expect(result).toEqual(data);
        });

        it('devuelve null si hay un error', async () => {
            const data = { legajo: 1, nombre_vendedor: 'John Doe', id_barrio: 1, fecha_ingreso: '2020-01-01' };
            sequelize.models.Vendedores.create.mockRejectedValue(new Error('Error'));

            const result = await controller.crearVendedor(data);

            expect(result).toBeNull();
        });
    });

    describe('deleteByLegajo', () => {
        it('deberia eliminar a un vendedor por legajo', async () => {
            sequelize.models.Vendedores.destroy.mockResolvedValue(1);

            const result = await controller.deleteByLegajo(1);

            expect(sequelize.models.Vendedores.destroy).toHaveBeenCalledWith({
                where: { legajo: 1 }
            });
            expect(result).toEqual(1);
        });

        it(' deberia mostrar un error si pasa algo malo', async () => {
            console.log = jest.fn();
            const error = new Error('Error');
            sequelize.models.Vendedores.destroy.mockRejectedValue(error);

            await controller.deleteByLegajo(1);

            expect(console.log).toHaveBeenCalledWith(error);
        });
    });

    describe('modificarVendedor', () => {
        it('modificaria un vendedor si existe', async () => {
            const data = { legajo: 1, nombre_vendedor: 'John Doe', id_barrio: 1, fecha_ingreso: '2020-01-01' };
            sequelize.models.Vendedores.findOne.mockResolvedValue(data);
            sequelize.models.Vendedores.update.mockResolvedValue([1]);

            const result = await controller.modificarVendedor(data);

            expect(sequelize.models.Vendedores.findOne).toHaveBeenCalledWith({
                attributes: ['legajo', 'nombre_vendedor', 'id_barrio', 'fecha_ingreso'],
                where: { legajo: data.legajo }
            });
            expect(sequelize.models.Vendedores.update).toHaveBeenCalledWith(
                {
                    legajo: data.legajo,
                    nombre_vendedor: data.nombre_vendedor,
                    id_barrio: data.id_barrio,
                    fecha_ingreso: data.fecha_ingreso
                },
                { where: { legajo: data.legajo } }
            );
            expect(result).toEqual(data);
        });

        it('si  no esncuentra vendedor lanza error', async () => {
            const data = { legajo: 1, nombre_vendedor: 'John Doe', id_barrio: 1, fecha_ingreso: '2020-01-01' };
            sequelize.models.Vendedores.findOne.mockResolvedValue(null);

            const result = await controller.modificarVendedor(data);

            expect(result).toEqual({ error: 'Vendedor no encontrado' });
        });
    });
});
