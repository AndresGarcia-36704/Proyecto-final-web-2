import express from "express";
export const makeupsRouter = express.Router();
import { index, create, show, update, destroy } from "../services/makeups.service.js";

import { createMakeupSchema, getMakeupSchema, updateMakeupSchema } from "../schemas/makeups.schema.js";
import { validatorHandler } from "../middleware/validator.handler.js";

makeupsRouter.get("/", async (req, res) => {
    try {
        const makeups = await index(); 
        res.render("index", { makeups, user: req.user || null }); 
    } catch (error) {
        console.error("Error en GET /:", error.message);
        res.status(500).send("Error al cargar los maquillajes.");
    }
});

makeupsRouter.post(
    '/',
    validatorHandler(createMakeupSchema, 'body'),
    async (req, res) => {
        try {
            const makeup = req.body;
            const newMakeup = await create(makeup);
            console.log('POST /api/v1/makeups');
            res.status(201).json({ success: true, data: newMakeup });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
);

makeupsRouter.get('/:id', 
    validatorHandler(getMakeupSchema, 'params'),
    async (req, res) => {
        try {
            const id = req.params.id;
            const makeup = await show(id);
            console.log(GET `/api/v1/makeups/${id}`);
            if (!makeup) {
                return res.status(404).json({ success: false, error: 'Makeup not found' });
            }
            res.status(200).json({ success: true, data: makeup });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
)

makeupsRouter.put('/:id', 
    validatorHandler(getMakeupSchema, 'params'),
    validatorHandler(updateMakeupSchema, 'body'),
    async (req, res) => {
        try {
            const id = req.params.id;
            const makeup = req.body;
            const updatedMakeup = await update(id, makeup);
            console.log(PUT `/api/v1/makeups/${id}`);
            if (!updatedMakeup) {
                return res.status(404).json({ success: false, error: 'Makeup not found' });
            }
            res.status(200).json({ success: true, data: updatedMakeup });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
)

makeupsRouter.delete('/:id',
    validatorHandler(getMakeupSchema, 'params'),
    async (req, res) => {
        try {
            const id = req.params.id;
            const makeup = await destroy(id);
            console.log(`DELETE /api/v1/makeups/${id}`);
            if (!makeup) {
                return res.status(404).json({ success: false, error: 'Makeup not found', deleted: false });
            }
            res.status(200).json({ success: true, data: makeup, deleted: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
)