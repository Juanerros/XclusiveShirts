class ProductService {
    constructor(conex) {
        this.conex = conex
    }

    async getAll() {
        try {
            const [rows] = await this.conex.execute(
                "SELECT p.id_product, p.name, p.category, p.price, p.description," +
                "c.id_color, c.name," + 
                "s.id_size, s.stock " +
                "FROM products p " +
                "JOIN stocks s ON p.id_product = s.id_product"
            );
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
}

export default ProductService;
