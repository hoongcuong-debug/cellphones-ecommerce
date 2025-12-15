import express from "express";
import CartController from "../controllers/CartController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/", CartController.showAllCarts);
router.post("/add", upload.none(), CartController.addCart);
router.patch("/update/:id", upload.none(), CartController.updateCart);
router.delete("/delete/:id", CartController.deleteCart);

export default router;
