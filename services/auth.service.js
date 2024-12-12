import { sequelize } from '../libs/sequelize.js';

// Función para crear un nuevo usuario (signup)
async function signup(username, password) {
    try {
        const user = await sequelize.models.Auth.create({
            username,
            password
        });
        return user;
    } catch (error) {
        console.error("Error en signup:", error);
        throw new Error("Error al crear el usuario.");
    }
}

export {
    signup
};
