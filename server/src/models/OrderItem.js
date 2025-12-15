import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "OrderItems",
    timestamps: true,
  }
);
export default OrderItem;
