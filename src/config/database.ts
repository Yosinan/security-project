import { PrismaClient } from '@prisma/client';
import { Sequelize } from "sequelize";

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

// Create an instance of PrismaClient
const prisma = new PrismaClient();

const sequelize = new Sequelize(
  `postgres://${username}:${password}@localhost:5432/${database}`,
  {
    dialect: "postgres",
  }
);


export default prisma;
export { sequelize };
