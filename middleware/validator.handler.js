// Middleware para validar datos en las peticiones (body, params, query)
export function validatorHandler(schema, property) {
    return (req, res, next) => {
        // Obtiene los datos de la propiedad especificada (body, params, query)
        const data = req[property];

        // Validar los datos usando el esquema proporcionado
        const { error } = schema.validate(data, { stripUnknown: true, abortEarly: false });

        // Si hay errores, devolver respuesta con los mensajes de error
        if (error) {
            res.status(422).json({
                errors: error.details.map((err) => err.message)
            });
        } else {
            // Si la validación es exitosa, continuar con el siguiente middleware o ruta
            next();
        }
    };
}
