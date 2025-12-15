import Product from "./Product.js";
import Brand from "./Brand.js";
import Category from "./Category.js";
import ProductSpec from "./ProductSpec.js";
import ProductImage from "./ProductImage.js";
import Status from "./Status.js";
import User from "./User.js";
import Role from "./Role.js";
import Cart from "./Cart.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import ProductReview from "./ProductReview.js";

// Product → Brand
Product.belongsTo(Brand, {
  foreignKey: "brandId",
  targetKey: "idBrand",
  as: "brand",
});
Brand.hasOne(Product, {
  foreignKey: "brandId",
  sourceKey: "idBrand",
  as: "products",
});

// Product → Category
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  targetKey: "idCate",
  as: "category",
});
Category.hasMany(Product, {
  foreignKey: "categoryId",
  sourceKey: "idCate",
  as: "products",
});

// Product -> ProductSpec
ProductSpec.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});
Product.hasOne(ProductSpec, {
  foreignKey: "productId",
  as: "specs",
});

// Product -> ProductImage
ProductImage.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});
Product.hasMany(ProductImage, {
  foreignKey: "productId",
  as: "images",
});

// Order -> OrderItem
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "orderItems",
});

export {
  Product,
  Brand,
  Category,
  ProductSpec,
  ProductImage,
  Status,
  User,
  Role,
  Cart,
  Order,
  OrderItem,
  ProductReview,
};
