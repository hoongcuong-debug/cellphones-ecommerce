import express from "express";
import OrderController from "../controllers/OrderController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/", OrderController.showAllOrders);
router.post("/add", upload.none(), OrderController.addOrder);
router.patch("/update/:id", upload.none(), OrderController.updateOrder);
router.delete("/delete/:id", OrderController.deleteOrder);

export default router;
