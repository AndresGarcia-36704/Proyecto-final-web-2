import express from 'express';
import { sequelize } from '../libs/sequelize.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// Aplicar el middleware de autenticación a todas las rutas de este archivo
router.use(isAuthenticated);

// Obtener todos los pedidos del usuario autenticado
router.get('/orders', async (req, res) => {
    try {
        // Obtener los pedidos del usuario autenticado
        const orders = await sequelize.models.Order.findAll({
            where: {
                userId: req.user.id, 
            },
        });

        // Renderizar la vista con los pedidos del usuario
        res.render('orders', { orders });
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).send('Hubo un error al cargar los pedidos.');
    }
});

// Ruta para ver el detalle de un pedido específico
router.get('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Obtener un solo pedido basado en el ID y verificar que pertenezca al usuario autenticado
        const order = await sequelize.models.Order.findOne({
            where: {
                id: orderId,
                userId: req.user.id, 
            },
        });

        if (!order) {
            return res.status(404).send('Pedido no encontrado o no autorizado para ver este pedido.');
        }

        // Renderizar la vista con el detalle del pedido
        res.render('order-detail', { order });
    } catch (error) {
        console.error('Error al obtener el detalle del pedido:', error);
        res.status(500).send('Hubo un error al cargar el detalle del pedido.');
    }
});

export default router;
