import express from "express";
import { createAddressController } from "../controllers/addressController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/createAddress", createAddressController);

export default router;
