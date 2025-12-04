import { createRating, productRating } from "../services/ratingServices.js";

const createRatingController = async(req, res)=>{
    try {
        const user = req.user;
        const {rating} = req.body;
        const productId = req.params.productId;
        const ratingDoc = await createRating(productId, rating, user);
        return res.status(201).json({
            success:true,
            ratingDoc
        })
    } catch (error) {
         return res.status(400).json({
            success: false,
            message: error.message || "Failure in creating rating",
        });
    }
};
const productRatingController = async(req, res)=>{
    try {
        const productId = req.params.productId;
        const productDoc = await productRating(productId);
        return res.status(201).json({
            success:true,
            productDoc
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"Failure in prodcut rating"
        })
    };
};

export {productRatingController, createRatingController}