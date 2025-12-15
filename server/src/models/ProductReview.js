import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const productReview = sequelize.define(
  "productReview",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "productReviews",
    timestamps: true,
  }
);
export default productReview;
