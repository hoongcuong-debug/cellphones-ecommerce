import express from "express";
import Role from "../controllers/RoleController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/", Role.showAllRole);
router.post("/add", upload.none(), Role.addRole);
router.put("/update/:id", upload.none(), Role.updateRole);
router.delete("/delete/:id", Role.deleteRole);
export default router;
