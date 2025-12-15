import express from "express";
import SpecController from "../controllers/SpecController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";
const upload = multer({ storage });
const router = express.Router();

router.get("/", SpecController.showAllSpecs);
router.post("/add", upload.none(), SpecController.addSpec);
router.patch("/update/:id", upload.none(), SpecController.updateSpecField);

export default router;
