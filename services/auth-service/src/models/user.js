import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.STRING, primaryKey: true },
    nom_complet: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone_num: { type: DataTypes.STRING, allowNull: false },
    mdp: { type: DataTypes.STRING, allowNull: false },
    bloquer: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'users',
    timestamps: true,
});
  
export { User };