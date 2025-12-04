import express from "express"
import { createReviewController, getAllReviewController } from "../controllers/reviewController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);
router.post("/createReview/:productId", createReviewController);
router.get("/getReview/:productId", getAllReviewController);

export default router;