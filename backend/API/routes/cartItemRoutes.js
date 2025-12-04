import express from "express";
const router = express.Router();
import { removeCartItemController, updateCartItemController } from "../services/cartService.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";


router.use(authMiddleware);
router.put("/update/:cartItemId", updateCartItemController);
router.delete("/remove/:cartItemId", removeCartItemController);

export default router;
