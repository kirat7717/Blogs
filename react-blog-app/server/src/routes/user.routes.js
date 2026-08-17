import { Router } from "express";
import {
  getOnlineUsers,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  requestResetPassword,
  ResetPassword,
  updateProfile,
  userCsvImport,
  verifyUser,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password/:token", ResetPassword);
router.post("/verify-email/:token",verifyUser)
router.post(
  "/csv-upload",
  verifyToken,
  authenticateUser,
  upload("csv").single("csvFile"),
  userCsvImport
);
router.get("/profile", verifyToken,authenticateUser, getProfile);
router.get(
  "/online-users",
  verifyToken,
  authenticateUser,
  getOnlineUsers
);

router.post("/logout",verifyToken,authenticateUser,logoutUser)
router.patch(
  "/profile",
  verifyToken,
  authenticateUser,
  upload("user").single("image"),
  updateProfile
);
export default router;
