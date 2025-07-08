import handleError from '../utils/handleError.js';

class ColorController {
    constructor(service) {
        this.service = service;
    }

    getById = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw { status: 400, message: 'El ID del color es requerido' };

            const color = await this.service.getById(id);

            res.status(200).json({
                success: true,
                message: 'Color obtenido correctamente',
                color
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    getAll = async (req, res) => {
        try {
            const colors = await this.service.getAll();

            res.status(200).json({
                success: true,
                message: 'Colores obtenidos correctamente',
                colors
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    create = async (req, res) => {
        const { name } = req.body;

        try {
            if (!name) throw { status: 400, message: 'El nombre es requerido' };

            const id_color = await this.service.create(name);

            res.status(201).json({
                success: true,
                message: 'Color creado correctamente',
                id_color
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        try {
            if (!id) throw { status: 400, message: 'El ID del color es requerido' };
            if (!name) throw { status: 400, message: 'El nombre es requerido' };

            await this.service.update(id, name);

            res.status(200).json({
                success: true,
                message: 'Color actualizado correctamente'
            });
        } catch (err) {
            handleError(res, err);
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) throw { status: 400, message: 'El ID del color es requerido' };

            await this.service.delete(id);
            
            res.status(200).json({
                success: true,
                message: 'Color eliminado correctamente'
            });
        } catch (err) {
            handleError(res, err);
        }
    }
}

export default ColorController;