class ProductService {
    constructor(conex) {
        this.conex = conex
    }

    async getById(productId) {
        try {
            const [product] = await this.conex.execute(
                "SELECT p.id_product, p.name AS product_name, p.category, p.price, p.description, " +
                "c.id_color, c.name AS color_name, " +
                "si.id_size, si.name AS size_name " +
                "FROM products p " +
                "JOIN stocks s ON p.id_product = s.id_product " +
                "JOIN colors c ON s.id_color = c.id_color " +
                "JOIN sizes si ON si.id_size = s.id_size " +
                "WHERE p.id_product = ?",
                [productId]
            );

            if (product.length === 0) throw { status: 404, message: 'Producto no encontrado' };

            return product[0];
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en getById ProductService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async getAllProducts() {
        try {
            const [rows] = await this.conex.execute(
                'SELECT * FROM products'
            )

            if (rows.length === 0) throw { status: 404, message: 'No se encontraron productos' };

            return rows;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en getAllProducts ProductService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async getAllInfo() {
        try {
            const [rows] = await this.conex.execute(
                "SELECT s.id_stock, p.id_product, p.name AS product_name, p.category, p.price, p.description, " +
                "c.id_color, c.name AS color_name, " +
                "si.id_size, si.name AS size_name " +
                "FROM products p " +
                "JOIN stocks s ON p.id_product = s.id_product " +
                "JOIN colors c ON s.id_color = c.id_color " +
                "JOIN sizes si ON si.id_size = s.id_size "
            );

            if (rows.length === 0) throw { status: 404, message: 'No se encontraron productos' };

            return rows;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en GetAll ProductService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    //                                           Array de objetos
    async create(name, category, price, description, stocks) {
        try {
            const [insertProduct] = await this.conex.execute(
                "INSERT INTO products (name, category, price, description) VALUES (?, ?, ?, ?)",
                [name, category, price, description]
            );
            const id_product = insertProduct.insertId;

            for (const item of stocks) {

                // Insertar en la tabla stock
                await this.conex.execute(
                    "INSERT INTO stocks (id_product, id_color, id_size, stock) VALUES (?, ?, ?, ?)",
                    [id_product, item.id_color, item.id_size, item.stock]
                );

                /*
                Esto recibe:
                
                stocks: [
                    {
                        id_color: 1, 
                        id_size: 1, 
                        stock: 10
                    },
                    {
                        id_color: 1, 
                        id_size: 2, 
                        stock: 5
                    },
                    {
                        id_color: 2, 
                        id_size: 2, 
                        stock: 20
                    }
                ]

                */
            }

            return id_product;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en Create ProductService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async update(productId, name, category, price, description, stocks) {
        try {
            const [product] = await this.conex.execute(
                "SELECT * FROM products WHERE id_product = ?",
                [productId]
            );
            if (product.length === 0) throw { status: 404, message: 'Producto no encontrado' };

            // Actualizar producto principal
            await this.conex.execute(
                "UPDATE products SET name = ?, category = ?, price = ?, description = ? WHERE id_product = ?",
                [name, category, price, description, productId]
            );

            // Eliminar stocks anteriores
            await this.conex.execute(
                "DELETE FROM stocks WHERE id_product = ?",
                [productId]
            );

            // Insertar nuevos stocks
            for (const item of stocks) {
                await this.conex.execute(
                    "INSERT INTO stocks (id_product, id_color, id_size, stock) VALUES (?, ?, ?, ?)",
                    [productId, item.id_color, item.id_size, item.stock]
                );
            }

            return true;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en Update ProductService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }

    async delete(productId) {
        try {
            const [product] = await this.conex.execute(
                "SELECT * FROM products WHERE id_product = ?",
                [productId]
            );
            if (product.length === 0) throw { status: 404, message: 'Producto no encontrado' };

            // Eliminar stocks asociados
            await this.conex.execute(
                "DELETE FROM stocks WHERE id_product = ?",
                [productId]
            );

            // Eliminar producto
            const [result] = await this.conex.execute(
                "DELETE FROM products WHERE id_product = ?",
                [productId]
            );

            if (result.affectedRows === 0) throw { status: 500, message: 'No se puedo borrar el producto' };

            return true;
        } catch (err) {
            if (err.status) throw err;
            console.error('Error interno en Delete ProductService:', err);
            throw { status: 500, message: 'Error interno del servidor', cause: err };
        }
    }
}

export default ProductService;
