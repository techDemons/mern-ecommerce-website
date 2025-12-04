import { createReview, getAllReview } from "../services/reviewServices.js";

const createReviewController = async(req, res)=>{
    try{
        const user = req.user;
        const productId = req.params.productId;
        const review = await createReview(req.body, productId ,user);
        return res.status(201).json({
            success: true,
            data: review,
        });
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Failure in creating review"
        });
    }
};
const getAllReviewController = async(req, res)=>{
    try{
        const productId = req.params.productId;
        const allReview = await getAllReview(productId);
        return res.status(201).json({
            success: true,
            data: allReview,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || "Failure in getting the review",
        });

    }
};
export { createReviewController, getAllReviewController}