import { Sequelize } from "sequelize";
import { userFactory } from "./user.js";
import { appointmentFactory } from "./appointment";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Appointment: appointmentFactory(sequelize),
};

export default db;
