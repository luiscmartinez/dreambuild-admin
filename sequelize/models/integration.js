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
      Integration.belongsTo(models.User);
    }
  }
  return Integration.init(
    {
      accessToken: DataTypes.STRING,
      userId: DataTypes.STRING,
      provider: DataTypes.STRING,
      providerAccountId: DataTypes.STRING,
      expiresAt: DataTypes.STRING,
      tokenType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Integration",
    }
  );
};
