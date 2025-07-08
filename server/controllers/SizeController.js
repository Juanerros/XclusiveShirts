import handleError from '../utils/handleError.js';

class SizeController {
    constructor(service) {
        this.service = service;
    }

    getById = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw { status: 400, message: 'El ID de la talla es requerido' };

            const size = await this.service.getById(id);

            res.status(200).json({
                success: true,
                message: 'Talla obtenida correctamente',
                size
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    getAll = async (req, res) => {
        try {
            const sizes = await this.service.getAll();

            res.status(200).json({
                success: true,
                message: 'Tallas obtenidas correctamente',
                sizes
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    create = async (req, res) => {
        const { name } = req.body;

        try {
            if (!name) throw { status: 400, message: 'El nombre es requerido' };

            const id_size = await this.service.create(name);

            res.status(201).json({
                success: true,
                message: 'Talla creada correctamente',
                id_size
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        try {
            if (!id) throw { status: 400, message: 'El ID de la talla es requerido' };
            if (!name) throw { status: 400, message: 'El nombre es requerido' };

            await this.service.update(id, name);

            res.status(200).json({
                success: true,
                message: 'Talla actualizada correctamente'
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw { status: 400, message: 'El ID de la talla es requerido' };

            await this.service.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Talla eliminada correctamente'
            });
        } catch (err) {
            handleError(res, err);
        }
    }
}

export default SizeController;