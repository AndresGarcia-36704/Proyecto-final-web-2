import express from 'express';
import { read, write } from '../utils/file.utils.js'; // Asegúrate de que la ruta sea correcta

const accessoriesFileRouter = express.Router();

// Ruta para obtener todos los productos
accessoriesFileRouter.get('/', (req, res) => {
    const products = read();  // Obtener los productos desde el archivo JSON
    res.json(products);       // Enviar los productos como respuesta
});

// Ruta para agregar un nuevo producto
accessoriesFileRouter.post('/', (req, res) => {
    const newProduct = req.body;  // Obtener el nuevo producto desde el cuerpo de la solicitud
    const products = read();      // Leer los productos existentes
    products.push(newProduct);    // Agregar el nuevo producto a la lista
    write(products);              // Guardar los productos actualizados en el archivo
    res.status(201).json(newProduct);  // Enviar el nuevo producto como respuesta
});

export { accessoriesFileRouter };  // Exportar el router para que se pueda usar en otros archivos
