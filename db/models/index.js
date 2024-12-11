import { defineMakeups } from './makeups.model.js'
import { defineOrders } from './order.model.js'
import { defineUsers } from './users.model.js'

export function defineModels(sequelize){
    defineMakeups(sequelize)
    defineUsers(sequelize)
    defineOrders(sequelize)
}


