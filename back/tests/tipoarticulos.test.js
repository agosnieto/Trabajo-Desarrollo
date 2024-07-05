const sequelize = require('../data/database.js');
const TipoArticulosController = require('../controllers/tipoarticulos.controller.js');
const controller = new TipoArticulosController();

jest.mock('../data/database.js', () => ({
    models: {
        TipoArticulos: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
        }
    }
}));

describe('TipoArticulosController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all tipo de articulos', async () => {
            const tipoArticulos = [{ id_tipo_articulo: 1, nombre_tipo_articulo: 'Tipo 1' }];
            sequelize.models.TipoArticulos.findAll.mockResolvedValue(tipoArticulos);

            const result = await controller.getAll();

            expect(sequelize.models.TipoArticulos.findAll).toHaveBeenCalledWith({
                attributes: ['id_tipo_articulo', 'nombre_tipo_articulo'],
                order: [['id_tipo_articulo', 'ASC']]
            });
            expect(result).toEqual(tipoArticulos);
        });
    });

    describe('getById', () => {
        it('should return a tipo de articulo by id_tipo_articulo', async () => {
            const tipoArticulo = { id_tipo_articulo: 1, nombre_tipo_articulo: 'Tipo 1' };
            sequelize.models.TipoArticulos.findOne.mockResolvedValue(tipoArticulo);

            const result = await controller.getById(1);

            expect(sequelize.models.TipoArticulos.findOne).toHaveBeenCalledWith({
                attributes: ['id_tipo_articulo', 'nombre_tipo_articulo'],
                where: { id_tipo_articulo: 1 }
            });
            expect(result).toEqual(tipoArticulo);
        });
    });

    describe('modificarTipoArticulo', () => {
        it('should modify an existing tipo de articulo', async () => {
            const data = { id_tipo_articulo: 1, nombre_tipo_articulo: 'Nuevo Tipo' };
            sequelize.models.TipoArticulos.findOne.mockResolvedValue(data);
            sequelize.models.TipoArticulos.update.mockResolvedValue([1]);

            const result = await controller.modificarTipoArticulo(data);

            expect(sequelize.models.TipoArticulos.findOne).toHaveBeenCalledWith({
                attributes: ['id_tipo_articulo', 'nombre_tipo_articulo'],
                where: { id_tipo_articulo: data.id_tipo_articulo }
            });
            expect(sequelize.models.TipoArticulos.update).toHaveBeenCalledWith(
                {
                    id_tipo_articulo: data.id_tipo_articulo,
                    nombre_tipo_articulo: data.nombre_tipo_articulo
                },
                { where: { id_tipo_articulo: data.id_tipo_articulo } }
            );
            expect(result).toEqual(data);
        });

        it('should return an error if tipo de articulo not found', async () => {
            const data = { id_tipo_articulo: 1, nombre_tipo_articulo: 'Nuevo Tipo' };
            sequelize.models.TipoArticulos.findOne.mockResolvedValue(null);

            const result = await controller.modificarTipoArticulo(data);

            expect(result).toEqual({ error: 'Tipo de articulo no encontrado' });
        });
    });
});
