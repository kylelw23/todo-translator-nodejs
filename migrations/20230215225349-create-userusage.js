"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userusage", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      loginTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      logoutTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      translateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      translateButtonClick: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      todoItemCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable("userusage");
  },
};
