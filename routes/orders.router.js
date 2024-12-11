import express from 'express';
import { defineOrders } from '../db/models/order.model.js';

const router = express.Router();

// Ruta para crear un nuevo pedido
router.post('/admin/orders', async (req, res) => {
    const { customerName, productId, quantity, totalPrice } = req.body;

    try {
        const order = await defineOrders.create({
            customerName,
            productId,
            quantity,
            totalPrice,
            status: 'successful', 
        });

        res.redirect('/admin/orders'); 
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).send('Hubo un error al guardar el pedido.');
    }
});

export default router;
