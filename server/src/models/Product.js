import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js"; //import Sequelize instance

const Product = sequelize.define(
  "Product", // tên model tùy chọn, không ảnh hưởng MySQL
  {
    idProduct: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },

    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    nameProduct: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    originalPrice: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: true,
    },

    discountPercent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    isFeatured: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },

    allowInstallment: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },

    allowOnlinePrice: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
