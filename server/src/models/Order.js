import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Order = sequelize.define(
  "Order",
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

    idOrder: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subTotal: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    discount: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    shippingFree: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    voucherCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConfirm: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);
export default Order;
