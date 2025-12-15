import express from "express";
import UserController from "../controllers/UserController.js";
import multer from "multer";
import { storage } from "../config/configMulter.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/pagination", UserController.showAllUsersByLimit);
router.get("/:idUser", UserController.showUserById);
router.get("/", UserController.showAllUsers);

router.post("/add", upload.single("avatarFile"), UserController.createUser);

// ✅ LOGIN ROUTE
router.post("/login", UserController.login);

router.patch(
  "/update/:idUser",
  upload.single("avatarFile"),
  UserController.updateUser
);

router.delete("/delete/:idUser", UserController.deleteUser);

export default router;
