import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Status = sequelize.define(
  "Status",
  {
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "status",
    timestamps: false,
  }
);
export default Status;
