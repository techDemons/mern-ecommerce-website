import express from "express";
import { createMultipleProductsController, createProductController, deleteProductController, findProductByidController, getAllProductController, updateProductController } from "../controllers/productController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.get("/getAllProduct", getAllProductController);
router.use(authMiddleware);
router.post("/createProduct", createProductController);
router.delete("/deleteProduct/:productId", deleteProductController);
router.put("/updateProduct/:productId", updateProductController);
router.post("/createMultipleProducts", createMultipleProductsController);
router.get("/findProduct/:productId", findProductByidController);

export default router;