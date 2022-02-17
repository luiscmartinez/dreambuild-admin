"use strict";
import { Model, DataTypes } from "sequelize";

export const appointmentFactory = (sequelize) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  return Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      body: DataTypes.TEXT,
      read: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Appointment",
      paranoid: false,
    }
  );
};
