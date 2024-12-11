import express from 'express';
import { sequelize } from "../libs/sequelize.js";

export const cartRouter = express.Router();

// Ruta para agregar un producto al carrito
cartRouter.post('/add', async (req, res) => {
    const { productId } = req.body;

    if (!req.session) {
        return res.status(500).json({ error: 'Session is not initialized' });
    }

    // Si no existe el carrito, inicializamos
    if (!req.session.cart) {
        req.session.cart = {};
    }

    try {
        // Obtener el producto de la base de datos usando productId
        const product = await sequelize.models.Makeup.findByPk(productId);

        // Si el producto no existe, lanzamos un error
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const price = parseFloat(product.price);
        if (isNaN(price)) {
            return res.status(500).json({ error: 'Precio del producto no válido' });
        }

        // Si el producto ya está en el carrito, aumentamos la canidad
        if (req.session.cart[productId]) {
            req.session.cart[productId].quantity += 1;
        } else {
            req.session.cart[productId] = {
                name: product.name,  
                price: price,         
                quantity: 1           
            };
        }

        console.log(`Producto ${productId} agregado al carrito`);
        res.redirect('/cart');  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

// Ruta para mostrar el carrito
cartRouter.get("/", (req, res) => {
    if (!req.session) {
        return res.status(500).json({ error: 'Session is not initialized' });
    }

    const cart = req.session.cart || {};

    let total = 0;
    Object.values(cart).forEach(item => {
        total += item.price * item.quantity; 
    });

    res.render('cart', { 
        message: "Productos en tu carrito",
        cart,
        total: total.toFixed(2)  
    });
});

// Ruta para procesar el pedido (checkout)
cartRouter.post('/checkout', async (req, res) => {
    const { document, firstName, lastName, address, phone } = req.body;
    const cart = req.session.cart || {};

    try {
        // Crear el pedido en la base de datos
        const newOrder = await sequelize.models.Order.create({
            document,
            firstName,
            lastName,
            address,
            phone,
            cart: JSON.stringify(cart), 
            status: 'successful', 
        });

        // Limpiar el carrito después de realizar el pedido
        req.session.cart = {};

        res.render('cart', {
            message: "Pedido realizado con éxito. ¡Gracias por tu compra!",
            cart: req.session.cart || {},
        });
    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        res.status(500).json({ error: 'Hubo un error al realizar el pedido' });
    }
});

export default cartRouter;
