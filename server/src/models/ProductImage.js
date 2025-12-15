import { DataTypes } from "sequelize";
import sequelize from "../databases/conectDatabase.js ";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    productId: {
      type: DataTypes.STRING(255),
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },
    isPrimary: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "productImages",
    timestamps: false,
  }
);
export default ProductImage;
