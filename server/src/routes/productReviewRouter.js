import express from "express";
import ProductReviewController from "../controllers/ProductReviewController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.post("/add", upload.none(), ProductReviewController.addReview);
router.get("/product/:productId", ProductReviewController.getReviewsByProduct);
router.get("/user/:userId", ProductReviewController.getReviewsByUser);

export default router;
