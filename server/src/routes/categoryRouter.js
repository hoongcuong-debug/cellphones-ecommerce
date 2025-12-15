import express from "express";
import CategoriesController from "../controllers/CategoriesController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";
const upload = multer({ storage });
const router = express.Router();

router.get("/", CategoriesController.showALLCategories); // show all products
router.post("/add", upload.single("logo"), CategoriesController.addCategory);
router.patch(
  "/update/:id",
  upload.single("logo"),
  CategoriesController.updateCategory
);
router.delete("/delete/:id", CategoriesController.deleteCategory);

export default router;
