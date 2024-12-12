import Joi from 'joi';

const id = Joi.number();
const name = Joi.string().min(5).max(255);
const done = Joi.boolean();
const imagePath = Joi.string().uri();

const createProductSchema = Joi.object({
    name: name.required(),
    done: done.optional(),
    imagePath: imagePath.optional(),
});

const updateProductSchema = Joi.object({
    name: name.optional(),
    done: done.optional(),
    imagePath: imagePath.optional(),
});

const getProductSchema = Joi.object({
    id: id.required(),
});

export {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
};
