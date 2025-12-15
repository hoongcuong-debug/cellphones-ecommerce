import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Role = sequelize.define(
  "Role",
  {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);
export default Role;
