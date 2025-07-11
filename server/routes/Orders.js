import express from 'express';
import createConnection from '../db/config/conex.js';
import handleError from '../utils/handleError.js';

const router = express.Router();

// Obtener todos los pedidos
router.get('/', async (req, res) => {
    const conex = await createConnection();
    try {
        const query = `
            SELECT 
                o.*,
                l.name as user_name,
                l.email as user_email
            FROM orders o
            INNER JOIN login l ON o.id_login = l.id_login
            ORDER BY o.order_date DESC
        `;
        
        const [orders] = await conex.execute(query);
        
        // Obtener items para cada pedido
        for (let order of orders) {
            const itemsQuery = `
                SELECT 
                    oi.*,
                    p.name as product_name,
                    c.name as color_name,
                    s.name as size_name
                FROM order_items oi
                INNER JOIN products p ON oi.id_product = p.id_product
                INNER JOIN colors c ON oi.id_color = c.id_color
                INNER JOIN sizes s ON oi.id_size = s.id_size
                WHERE oi.id_order = ?
            `;
            
            const [items] = await conex.execute(itemsQuery, [order.id_order]);
            order.items = items;
        }
        
        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

// Obtener estadísticas de pedidos (debe ir antes de /:id)
router.get('/stats', async (req, res) => {
    const conex = await createConnection();
    try {
        // Total de pedidos
        const [totalOrders] = await conex.execute('SELECT COUNT(*) as total FROM orders');
        
        // Pedidos pendientes
        const [pendingOrders] = await conex.execute('SELECT COUNT(*) as total FROM orders WHERE status = "pendiente"');
        
        // Ingresos totales
        const [revenue] = await conex.execute('SELECT SUM(total_amount) as total FROM orders WHERE status != "cancelado"');
        
        // Pedidos recientes
        const recentQuery = `
            SELECT 
                o.*,
                l.name as user_name,
                l.email as user_email
            FROM orders o
            INNER JOIN login l ON o.id_login = l.id_login
            ORDER BY o.order_date DESC
            LIMIT 10
        `;
        
        const [recentOrders] = await conex.execute(recentQuery);
        
        res.json({
            success: true,
            stats: {
                total_orders: totalOrders[0].total,
                pending_orders: pendingOrders[0].total,
                total_revenue: revenue[0].total || 0,
                recent_orders: recentOrders
            }
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

// Obtener un pedido específico
router.get('/:id', async (req, res) => {
    const conex = await createConnection();
    try {
        const { id } = req.params;
        
        const orderQuery = `
            SELECT 
                o.*,
                l.name as user_name,
                l.email as user_email
            FROM orders o
            INNER JOIN login l ON o.id_login = l.id_login
            WHERE o.id_order = ?
        `;
        
        const [orders] = await conex.execute(orderQuery, [id]);
        
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }
        
        const order = orders[0];
        
        // Obtener items del pedido
        const itemsQuery = `
            SELECT 
                oi.*,
                p.name as product_name,
                c.name as color_name,
                s.name as size_name
            FROM order_items oi
            INNER JOIN products p ON oi.id_product = p.id_product
            INNER JOIN colors c ON oi.id_color = c.id_color
            INNER JOIN sizes s ON oi.id_size = s.id_size
            WHERE oi.id_order = ?
        `;
        
        const [items] = await conex.execute(itemsQuery, [id]);
        order.items = items;
        
        res.json({
            success: true,
            order: order
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

// Actualizar estado de pedido
router.patch('/:id/status', async (req, res) => {
    const conex = await createConnection();
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const validStatuses = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Estado no válido'
            });
        }
        
        const query = 'UPDATE orders SET status = ? WHERE id_order = ?';
        const [result] = await conex.execute(query, [status, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Estado del pedido actualizado correctamente'
        });
    } catch (error) {
        handleError(res, error);
    } finally {
        await conex.end();
    }
});

export default router; 