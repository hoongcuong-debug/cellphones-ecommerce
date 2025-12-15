import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Category = sequelize.define(
  "Category",
  {
    idCate: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nameCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);
export default Category;
