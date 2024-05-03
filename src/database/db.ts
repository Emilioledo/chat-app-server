import { Sequelize } from "sequelize";

const DB = process.env.DB as string;
const USER_DB = process.env.USER_DB as string;
const PASSWORD_DB = process.env.PASSWORD_DB as string;

export const sequelize = new Sequelize(DB, USER_DB, PASSWORD_DB, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
