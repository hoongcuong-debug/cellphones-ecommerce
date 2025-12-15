import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const productQuestion = sequelize.define(
  "productQuestion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    productId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    question: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    answeredBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "productQuestions",
    timestamps: true,
  }
);
export default productQuestion;
