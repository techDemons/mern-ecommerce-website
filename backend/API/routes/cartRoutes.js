import express from "express";
import { addItemToCart, createCartController, findUserCart } from "../controllers/cartController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";


const router = express.Router();
router.use(authMiddleware);
router.post("/createCart", createCartController);
router.get("/findUserCart", findUserCart);
router.put("/addItemToCart", addItemToCart);

export default router;
