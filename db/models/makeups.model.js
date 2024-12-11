import { DataTypes } from "sequelize";

export function defineMakeups(sequelize){
    sequelize.define('Makeup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        imagePath: { 
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: 'images/default.jpeg' 
        }
    })
    
};