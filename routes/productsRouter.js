import express from 'express';
import { writeLog, logActivity } from '../utils/file.utils.js';  // Importación correcta
import dayjs from 'dayjs';

export const productsRouter = express.Router();

// Obtener todos los productos
productsRouter.get("/", (req, res) => {
    let products = read();  // Leemos los datos del archivo
    let done = req.query.done;

    // Filtrar por "done" y limitar resultados
    if (done === 'true') {
        done = true;
    } else if (done === 'false') {
        done = false;
    }

    if (req.query.done || req.query.limit) {
        products = req.query.done ? products.filter(product => product.done === done) : products;
        products = req.query.limit ? products.slice(0, parseInt(req.query.limit)) : products;
        return res.json(products);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(products));
});

// Crear un nuevo producto
productsRouter.post('/', (req, res, next) => {
    req.body.ip = req.ip;
    req.body.created_at = dayjs().format('HH:mm DD-MM-YYYY');
    next();
}, (req, res) => {
    const products = read();
    const product = {
        ...req.body,
        id: products.length + 1  // ID simple, se puede mejorar con un generador de IDs únicos
    };
    products.push(product);
    write(products);
    res.status(201).json(product);  // Devolvemos el producto recién creado

    // Registrar la actividad de creación de producto
    logActivity('CREATE_PRODUCT', `Producto creado: ${JSON.stringify(product)}`);
});

// Obtener un producto por ID
productsRouter.get('/:id', (req, res) => {
    const products = read();
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).end();  // Producto no encontrado
    }

    // Registrar la actividad de consulta de producto
    logActivity('GET_PRODUCT', `Producto consultado: ${req.params.id}`);
});

// Actualizar un producto por ID
productsRouter.put('/:id', (req, res, next) => {
    req.body.ip = req.ip;
    req.body.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
    next();
}, (req, res) => {
    const products = read();
    let product = products.find(product => product.id === parseInt(req.params.id));

    if (product) {
        product = { ...product, ...req.body };
        products[products.findIndex(p => p.id === parseInt(req.params.id))] = product;
        write(products);
        res.json(product);  // Devolvemos el producto actualizado

        // Registrar la actividad de actualización de producto
        logActivity('UPDATE_PRODUCT', `Producto actualizado: ${JSON.stringify(product)}`);
    } else {
        res.status(404).end();  // Producto no encontrado
    }
});

// Marcar todos los productos como "done"
productsRouter.put('/update/to/done', (req, res) => {
    let products = read();
    products = products.map(product => {
        product.done = true;
        product.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        return product;
    });
    write(products);
    res.json(products);

    // Registrar la actividad de actualización masiva de productos
    logActivity('UPDATE_ALL_PRODUCTS_TO_DONE', 'Todos los productos fueron marcados como completados.');
});

// Eliminar un producto por ID
productsRouter.delete('/:id', (req, res) => {
    const products = read();
    const product = products.find(product => product.id === parseInt(req.params.id));

    if (product) {
        products.splice(products.findIndex(product => product.id === parseInt(req.params.id)), 1);
        write(products);
        res.json(product);  // Devolvemos el producto eliminado

        // Registrar la actividad de eliminación de producto
        logActivity('DELETE_PRODUCT', `Producto eliminado: ${req.params.id}`);
    } else {
        res.status(404).end();  // Producto no encontrado
    }
});

export default productsRouter;
