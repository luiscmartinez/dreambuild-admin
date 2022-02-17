import { Sequelize } from "sequelize";
import { userFactory } from "./user.js";
import { appointmentFactory } from "./appointment";

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
});

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Appointment: appointmentFactory(sequelize),
};

export default db;
