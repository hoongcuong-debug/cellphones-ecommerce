import express from "express";
import Status from "../controllers/StatusController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/", Status.showAllStatus);
router.post("/add", upload.none(), Status.addStatus);
router.put("/update/:id", upload.none(), Status.updateStatus);
router.delete("/delete/:id", Status.deleteStatus);
export default router;
