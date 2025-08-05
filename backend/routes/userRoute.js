import express from "express";
import {
  getAllUser,
  login,
  logout,
  signup,
  updateProfilePic,
  verifyUser,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verifyUser);
router.get("/get-users", isAuthenticated, getAllUser);
router.put(
  "/profile-picture",
  isAuthenticated,
  upload.single("avatar"),
  updateProfilePic
);

export default router;
