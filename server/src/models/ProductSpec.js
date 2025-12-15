import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const ProductSpec = sequelize.define(
  "ProductSpec",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    screenSize: {
      type: DataTypes.STRING(50),
    },
    screenTechnology: {
      type: DataTypes.STRING(100),
    },
    rearCamera: {
      type: DataTypes.TEXT,
    },
    frontCamera: {
      type: DataTypes.STRING(100),
    },
    chipset: {
      type: DataTypes.STRING(50),
    },
    internalMemory: {
      type: DataTypes.STRING(50),
    },
    battery: {
      type: DataTypes.STRING(100),
    },
    operatingSystem: {
      type: DataTypes.STRING(50),
    },
    screenResolution: {
      type: DataTypes.STRING(50),
    },
    screenFeatures: {
      type: DataTypes.TEXT,
    },
    cpuType: {
      type: DataTypes.STRING(50),
    },
    compatibility: {
      type: DataTypes.TEXT,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { tableName: "productSpecs", timestamps: false }
);

export default ProductSpec;
