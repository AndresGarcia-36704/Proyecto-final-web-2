import Joi from 'joi';

const id = Joi.number();
const name = Joi.string().min(5).max(255);
const done = Joi.boolean();
const imagePath = Joi.string().uri(); // Campo para la ruta de la imagen

const createMakeupSchema = Joi.object({
    name: name.required(),
    done: done.optional(),
    imagePath: imagePath.optional(), // El campo es opcional para la creación
});

const updateMakeupSchema = Joi.object({
    name: name.optional(),
    done: done.optional(),
    imagePath: imagePath.optional(), // El campo es opcional para la actualización
});

const getMakeupSchema = Joi.object({
    id: id.required(),
});

export {
    createMakeupSchema,
    updateMakeupSchema,
    getMakeupSchema,
};
