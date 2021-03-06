module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Integrations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accessToken: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
      },
      providerAccountId: {
        type: Sequelize.STRING,
      },
      expiresAt: {
        type: Sequelize.STRING,
      },
      tokenType: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Integrations");
  },
};
