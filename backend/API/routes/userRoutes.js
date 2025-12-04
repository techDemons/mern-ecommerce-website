import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { newUser, login, getUserProfile, logOut, getUserByEmail, getUserById } from "../controllers/user.js";
const router = express.Router();

router.post("/signUp", newUser);
router.post("/login", login);
router.use(authMiddleware);
router.get("/getUserProfile", getUserProfile);
router.get("/getUserByEmail", getUserByEmail);
router.get("/getUserById", getUserById);
router.get("/logOut", logOut);

export default router;