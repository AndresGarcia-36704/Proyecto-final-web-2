import express from 'express';
import { sequelize } from '../libs/sequelize.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/orders', async (req, res) => {
    try {
        const orders = await sequelize.models.Order.findAll();

        res.render('orders', { orders });
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).send('Hubo un error al cargar los pedidos.');
    }
});

export default router;
