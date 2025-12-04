import express from "express";
import { createRatingController, productRatingController } from "../controllers/ratingController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);
router.post("/createRating/:productId",createRatingController);
router.get("/get/:productId", productRatingController);

export default router;