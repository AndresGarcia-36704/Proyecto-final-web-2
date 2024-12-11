import { DataTypes } from 'sequelize';

export function defineOrders(sequelize) {
    const Order = sequelize.define('Order', {
        document: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cart: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Pending', 
        }
    });

    return Order;
}
