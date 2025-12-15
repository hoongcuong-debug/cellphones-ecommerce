import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js";

const Spec = sequelize.define(
  "Spec",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  { tableName: "specs", timestamps: false }
);

export default Spec;
