import { defineProducts } from './products.model.js'; 
import { defineOrders } from './order.model.js'; 
import { defineCustomers } from './user.model.js'; 

export function defineModels(sequelize) {
    defineProducts(sequelize); 
    defineCustomers(sequelize); 
    defineOrders(sequelize); 
}
