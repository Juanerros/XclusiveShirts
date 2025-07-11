import express from 'express';
import createConnection from '../db/config/conex.js';
import handleError from '../utils/handleError.js';

const router = express.Router();

// Obtener stock de un producto específico
router.get('/product/:id', async (req, res) => {
    const conex = await createConnection();
    try {
        const { id } = req.params;
        
        const query = `
            SELECT 
                s.id_stock,
                s.id_product,
                s.id_color,
                s.id_size,
                s.stock,
                c.name as color_name,
                sz.name as size_name
            FROM stocks s
            INNER JOIN colors c ON s.id_color = c.id_color
            INNER JOIN sizes sz ON s.id_size = sz.id_size
            WHERE s.id_product = ?
        `;
        
        const [rows] = await conex.execute(query, [id]);
        
        res.json({
            success: true,
            stock: rows
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

// Actualizar stock
router.put('/:stockId', async (req, res) => {
    const conex = await createConnection();
    try {
        const { stockId } = req.params;
        const { stock } = req.body;
        
        if (stock < 0) {
            return res.status(400).json({
                success: false,
                message: 'El stock no puede ser negativo'
            });
        }
        
        const query = 'UPDATE stocks SET stock = ? WHERE id_stock = ?';
        const [result] = await conex.execute(query, [stock, stockId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Stock no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Stock actualizado correctamente'
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

// Obtener alertas de stock bajo
router.get('/alerts', async (req, res) => {
    const conex = await createConnection();
    try {
        const threshold = req.query.threshold || 5;
        
        const query = `
            SELECT 
                s.id_product,
                p.name as product_name,
                c.name as color_name,
                sz.name as size_name,
                s.stock as current_stock
            FROM stocks s
            INNER JOIN products p ON s.id_product = p.id_product
            INNER JOIN colors c ON s.id_color = c.id_color
            INNER JOIN sizes sz ON s.id_size = sz.id_size
            WHERE s.stock < ?
            ORDER BY s.stock ASC
        `;
        
        const [rows] = await conex.execute(query, [threshold]);
        
        res.json({
            success: true,
            alerts: rows
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

// Crear nuevo stock para un producto
router.post('/create', async (req, res) => {
    const conex = await createConnection();
    try {
        const { id_product, id_color, id_size, stock } = req.body;
        
        if (!id_product || !id_color || !id_size || stock === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }
        
        if (stock < 0) {
            return res.status(400).json({
                success: false,
                message: 'El stock no puede ser negativo'
            });
        }
        
        // Verificar si ya existe este stock
        const checkQuery = 'SELECT id_stock FROM stocks WHERE id_product = ? AND id_color = ? AND id_size = ?';
        const [existing] = await conex.execute(checkQuery, [id_product, id_color, id_size]);
        
        if (existing.length > 0) {
            // Actualizar el stock existente
            const updateQuery = 'UPDATE stocks SET stock = ? WHERE id_product = ? AND id_color = ? AND id_size = ?';
            await conex.execute(updateQuery, [stock, id_product, id_color, id_size]);
        } else {
            // Crear nuevo stock
            const insertQuery = 'INSERT INTO stocks (id_product, id_color, id_size, stock) VALUES (?, ?, ?, ?)';
            await conex.execute(insertQuery, [id_product, id_color, id_size, stock]);
        }
        
        res.json({
            success: true,
            message: 'Stock creado/actualizado correctamente'
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

export default router; 