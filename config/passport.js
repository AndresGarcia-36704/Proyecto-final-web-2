import passport from 'passport';
import './strategies/local.strategy.js';
import { sequelize } from '../libs/sequelize.js';

export function configurePassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Serializa el usuario (cliente) en la sesión
    passport.serializeUser(function(customer, done) {
        done(null, customer.id);
    });

    // Deserializa el cliente de la sesión usando el id
    passport.deserializeUser(async (id, done) => {
        try {
            // Busca al cliente por su ID
            const customer = await sequelize.models.customer.findByPk(id);
            done(null, customer);
        } catch (error) {
            done(error);
        }
    });
}
