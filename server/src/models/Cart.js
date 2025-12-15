import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Cart = sequelize.define(
  "Cart",
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
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);
export default Cart;
