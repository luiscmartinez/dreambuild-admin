const { loadEnvConfig } = require("@next/env");
const crypto = require("crypto");

loadEnvConfig("./").combinedEnv;

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(process.env.SUPERUSER_PASS, salt, 1000, 64, "sha512")
      .toString("hex");
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "dbg_superuser",
          isSuperUser: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: hash,
          salt,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
