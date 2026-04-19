import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export const authenticate = () => connectDB.authenticate();
export const sync = () => connectDB.sync();

export default connectDB;