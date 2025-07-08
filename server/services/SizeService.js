class SizeService {
    constructor(conex) {
        this.conex = conex;
    }

    async getById(id_size) {
        try {
            const [rows] = await this.conex.execute(
                "SELECT * FROM sizes WHERE id_size = ?",
                [id_size]
            );

            if (rows.length === 0) throw { status: 404, message: 'Talla no encontrada' };

            return rows[0];
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en getById SizeService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async getAll() {
        try {
            const [rows] = await this.conex.execute(
                "SELECT * FROM sizes"
            );

            return rows;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en getAll SizeService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async create(name) {
        try {
            const [result] = await this.conex.execute(
                "INSERT INTO sizes (name) VALUES (?)",
                [name]
            );

            return result.insertId;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en create SizeService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async update(id_size, name) {
        try {
            await this.getById(id_size);

            const [result] = await this.conex.execute(
                "UPDATE sizes SET name = ? WHERE id_size = ?",
                [name, id_size]
            );
            
            if (result.affectedRows === 0) throw { status: 404, message: 'Talla no encontrada' };
            
            return true;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en update SizeService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async delete(id_size) {
        try {
            await this.getById(id_size);

            const [result] = await this.conex.execute(
                "DELETE FROM sizes WHERE id_size = ?",
                [id_size]
            );

            if (result.affectedRows === 0) throw { status: 404, message: 'Talla no encontrada' };
            
            return true;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en delete SizeService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }
}

export default SizeService;