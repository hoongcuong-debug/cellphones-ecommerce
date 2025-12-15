import express from "express";
import ProductsController from "../controllers/ProductsController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";
const upload = multer({ storage });
const router = express.Router();

router.get("/", ProductsController.showAllProducts); // show all products

router.get("/pagination", ProductsController.showProductsByLimit); // show products by limit

router.get("/:slug", ProductsController.showOneProductBySlug); // show product by :slug

router.post(
  "/add",
  upload.fields([
    { name: "thumbnailPath", maxCount: 1 }, // 1 file thumbnail
    { name: "imagesFile", maxCount: 10 }, // nhiều file images
  ]),
  ProductsController.createProduct
); // create new product

router.patch(
  "/update/:idProduct",
  upload.fields([
    { name: "thumbnailPath", maxCount: 1 }, // 1 file thumbnail
    { name: "imagesFile", maxCount: 10 }, // nhiều file images
  ]),
  ProductsController.updateProduct
);

router.delete("/delete/:id", ProductsController.deleteProduct);
export default router;
