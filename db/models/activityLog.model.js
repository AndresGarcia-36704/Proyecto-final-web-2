import { DataTypes } from 'sequelize';
import { sequelize } from '../libs/sequelize.js';

const ActivityLog = sequelize.define('ActivityLog', {
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

export default ActivityLog;
