"use strict";
import { Sequelize, Model, DataTypes } from "sequelize";

export const integrationFactory = (sequelize) => {
  class Integration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log("MODELS", models);
      Integration.belongsTo(models.User);
    }
  }
  return Integration.init(
    {
      accessToken: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Integration",
    }
  );
};
