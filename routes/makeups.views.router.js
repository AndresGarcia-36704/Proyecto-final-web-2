import express from "express";
import { index, create, update, destroy, getProductsGroupedByCategory } from "../services/makeups.service.js";

export const makeupsViewsRouter = express.Router();

// Ruta pública para mostrar categorías e makeups
makeupsViewsRouter.get("/", async (req, res) => {
    try {
        const categories = await getProductsGroupedByCategory();
        res.render("home", { categories, user: req.user || null });
    } catch (error) {
        console.error("Error in GET /:", error.message);
        res.status(500).send("Error loading the home page.");
    }
});

// Middleware para proteger las rutas
makeupsViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
});

// Ruta protegida para listar makeups
makeupsViewsRouter.get("/list", async (req, res) => {
    try {
        const makeups = await index(); // Asegúrate de que esta función obtenga correctamente los maquillajes desde la base de datos
        res.render("index", {
            makeups: makeups,  // Pasa el objeto Makeups a la vista
            user: req.user      // Pasa el usuario autenticado, si es necesario
        });
    } catch (error) {
        console.error("Error in GET /list:", error.message);
        res.status(500).send("Error loading makeups.");
    }
});

// Ruta para crear un nuevo makeups
makeupsViewsRouter.post("/", async (req, res) => {
    try {
        const { name, done, brand, price, category, description, imagePath } = req.body;
        const isDone = done === "on";
        await create({ name, done: isDone, brand, price, category, description, imagePath });
        res.redirect("/makeups/list"); // Cambiar aquí
    } catch (error) {
        console.error("Error in POST /makeups:", error.message);
        res.status(500).send("Error creating makeup.");
    }
});


// Ruta para editar un makeup
makeupsViewsRouter.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, done, brand, price, category, description, imagePath } = req.body;
        const isDone = done === "on";
        const updatedMakeup = await update(id, { name, done: isDone, brand, price, category, description, imagePath });
        if (!updatedMakeup) {
            return res.status(404).send("Makeup no encontrado.");
        }
        res.redirect("/makeups/list");
    } catch (error) {
        console.error("Error en POST /edit/:id:", error.message);
        res.status(500).send("Error al editar el makeup.");
    }
});


// Ruta para eliminar un makeup
makeupsViewsRouter.post("/destroy/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await destroy(id);
        res.redirect("/makeups/list"); 
    } catch (error) {
        console.error("Error in POST /destroy/:id:", error.message);
        res.status(500).send("Error deleting makeup.");
    }
});
