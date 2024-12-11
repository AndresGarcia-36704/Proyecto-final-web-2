import { sequelize } from "../libs/sequelize.js";

export async function getCartItems(userId) {
  return await sequelize.models.cart.findAll({
    where: { userId },
    include: { model: sequelize.models.product },
  });
}

export async function addToCart(userId, productId) {
  await sequelize.models.cart.create({ userId, productId });
}
