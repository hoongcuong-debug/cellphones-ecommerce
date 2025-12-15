import express from "express";
import ProductQuestionController from "../controllers/ProductQuestionController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

// user hỏi
router.post("/ask", upload.none(), ProductQuestionController.addQuestion);

// shop trả lời
router.put(
  "/answer/:id",
  upload.none(),
  ProductQuestionController.answerQuestion
);

// lấy ra tất cả
router.get("/", ProductQuestionController.getAllQuestion);

// lấy theo productId
router.get("/product/:productId", ProductQuestionController.getByProduct);

// lấy theo userId
router.get("/user/:userId", ProductQuestionController.getByUser);

export default router;
