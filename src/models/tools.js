"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.Stack, { through: "StackTools" });
    }
  }
  Tools.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tools",
    }
  );
  return Tools;
};
