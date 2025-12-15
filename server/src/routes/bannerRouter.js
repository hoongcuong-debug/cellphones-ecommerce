import express from "express";
import BannerController from "../controllers/BannerController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/", BannerController.showAllBanners);
router.post("/add", upload.single("image"), BannerController.createBanner);
router.patch(
  "/update/:id",
  upload.single("image"),
  BannerController.updateBanner
);
router.delete("/delete/:id", BannerController.deleteBanner);

export default router;
