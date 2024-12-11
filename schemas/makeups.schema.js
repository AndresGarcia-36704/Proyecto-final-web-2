import Joi from 'joi';

const id = Joi.number();
const name = Joi.string().min(5).max(255);
const done = Joi.boolean();
const imagePath = Joi.string().uri();

const createMakeupSchema = Joi.object({
    name: name.required(),
    done: done.optional(),
    imagePath: imagePath.optional(), 
});

const updateMakeupSchema = Joi.object({
    name: name.optional(),
    done: done.optional(),
    imagePath: imagePath.optional(), 
});

const getMakeupSchema = Joi.object({
    id: id.required(),
});

export {
    createMakeupSchema,
    updateMakeupSchema,
    getMakeupSchema,
};
