import { Sequelize } from "sequelize";
import { userFactory } from "./user.js";
import { appointmentFactory } from "./appointment";
import { integrationFactory } from "./integration.js";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const db = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Appointment: appointmentFactory(sequelize),
  Integration: integrationFactory(sequelize),
};

export default db;
