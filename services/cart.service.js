import { sequelize } from "../libs/sequelize.js";

// Función para obtener los productos en el carrito de un usuario
export async function getCartItems(userId) {
  return await sequelize.models.Cart.findAll({
    where: { userId },
    include: { model: sequelize.models.Product },
  });
}

// Función para agregar un producto al carrito de un usuario
export async function addToCart(userId, productId) {
  await sequelize.models.Cart.create({ userId, productId });
}
