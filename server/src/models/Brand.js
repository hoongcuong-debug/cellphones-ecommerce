import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Brand = sequelize.define(
  "Brand",
  {
    idBrand: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameBrand: {
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
    tableName: "brands",
    timestamps: true,
  }
);
export default Brand;
