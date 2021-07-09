"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StackTools", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      StackId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: "Stacks", key: "id" },
        unique: false,
      },
      ToolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: "Tools", key: "id" },
        unique: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StackTools");
  },
};
