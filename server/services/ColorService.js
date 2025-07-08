class ColorService {
    constructor(conex) {
        this.conex = conex;
    }

    async getById(id_color) {
        try {
            const [rows] = await this.conex.execute(
                "SELECT * FROM colors WHERE id_color = ?",
                [id_color]
            );

            if (rows.length === 0) throw { status: 404, message: 'Color no encontrado' };

            return rows[0];
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en getById ColorService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async getAll() {
        try {
            const [rows] = await this.conex.execute(
                "SELECT * FROM colors"
            );

            return rows;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en getAll ColorService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async create(name) {
        try {
            const [result] = await this.conex.execute(
                "INSERT INTO colors (name) VALUES (?)",
                [name]
            );

            return result.insertId;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en create ColorService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async update(id_color, name) {
        try {
            await this.getById(id_color);

            const [result] = await this.conex.execute(
                "UPDATE colors SET name = ? WHERE id_color = ?",
                [name, id_color]
            );

            if (result.affectedRows === 0) throw { status: 404, message: 'Color no encontrado' };

            return true;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en update ColorService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async delete(id_color) {
        try {
            await this.getById(id_color);

            const [result] = await this.conex.execute(
                "DELETE FROM colors WHERE id_color = ?",
                [id_color]
            );

            if (result.affectedRows === 0) throw { status: 404, message: 'Color no encontrado' };
            
            return true;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en delete ColorService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }
}

export default ColorService;