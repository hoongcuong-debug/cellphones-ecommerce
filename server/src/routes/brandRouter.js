import express from "express";
import BrandsController from "../controllers/BrandsController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/", BrandsController.showAllBrands); // show all products
router.post("/add", upload.single("logo"), BrandsController.addBrand);
router.patch(
  "/update/:id",
  upload.single("logo"),
  BrandsController.updateBrand
);
router.delete("/delete/:id", BrandsController.deleteBrand);

export default router;
