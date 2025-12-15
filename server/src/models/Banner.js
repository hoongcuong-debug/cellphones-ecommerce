import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase";

const Banner = sequelize.define(
  "Banner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },

    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    isActive: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },

    startDate: {
      type: DataTypes.DATE,
    },

    endDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "banners",
  }
);

export default Banner;
