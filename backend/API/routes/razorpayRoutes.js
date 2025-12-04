import express from "express";
import { razorpayPaymentController, updatePaymentInfoController } from "../controllers/razorpayController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/pay/:id", authMiddleware, razorpayPaymentController);

router.get("/update", updatePaymentInfoController);

export default router;