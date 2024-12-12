import passport from "passport";
import LocalStrategy from 'passport-local';
import { sequelize } from '../../libs/sequelize.js';

// Usamos la estrategia Local para la autenticación
passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            // Buscar al cliente por su email o nombre de usuario
            const customer = await sequelize.models.customer.findOne({
                where: {
                    email: username // Asumimos que el email es el identificador único
                }
            });

            // Si no encontramos al cliente
            if (!customer) {
                return done(null, false, { message: 'Incorrect email or username.' });
            }

            // Comparamos las contraseñas directamente
            if (customer.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            // Si todo es correcto, devolvemos al cliente
            return done(null, customer);
        } catch (error) {
            // Si ocurre algún error, lo pasamos a la función done
            return done(error);
        }
    })
);
