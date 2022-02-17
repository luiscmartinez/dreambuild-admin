"use strict";
import { Model, DataTypes } from "sequelize";

export const userFactory = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      isSuperUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isStaff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      lastLogin: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: false,
    }
  );
};
