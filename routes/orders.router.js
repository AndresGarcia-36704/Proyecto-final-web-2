import express from 'express';
import { defineOrders } from '../db/models/order.model.js';
import { body, validationResult } from 'express-validator'; // Usando express-validator

const router = express.Router();

// Ruta para crear un nuevo pedido
router.post(
    '/admin/orders',
    // Validaciones de entrada
    body('customerName').isString().withMessage('El nombre del cliente es obligatorio y debe ser una cadena'),
    body('productId').isInt().withMessage('El ID del producto debe ser un número entero'),
    body('quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('El precio total debe ser un número positivo'),

    async (req, res) => {
        // Validación de errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { customerName, productId, quantity, totalPrice } = req.body;

        try {
            const order = await defineOrders.create({
                customerName,
                productId,
                quantity,
                totalPrice,
                status: 'successful', // Puedes cambiar esto a dinámico si es necesario
            });

            // Si es una API RESTful, podemos devolver un JSON con el pedido creado
            res.status(201).json({ success: true, data: order });

            // Si prefieres una redirección como en un formulario tradicional
            // res.redirect('/admin/orders');
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            res.status(500).json({ success: false, message: 'Hubo un error al guardar el pedido.' });
        }
    }
);

export default router;
