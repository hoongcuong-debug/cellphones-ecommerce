import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

    idUser: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    addresses: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
