import express from 'express';
import { signup } from '../services/auth.service.js';

const router = express.Router();

// Ruta para crear un nuevo usuario (signup)
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await signup(username, password);
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (error) {
        console.error("Error en POST /signup:", error);
        res.status(500).send("Error al crear el usuario.");
    }
});

export default router;
