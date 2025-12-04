import express from "express";
import { createOrderController, findOrderId as findOrderById } from "../controllers/orderController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);
router.post("/createOrder", createOrderController);
router.get("/findOrder/:orderId", findOrderById);

export default router;
