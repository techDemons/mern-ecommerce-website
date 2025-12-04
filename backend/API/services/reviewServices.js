import { product } from "../models/product.model.js"
import { review } from "../models/review.model.js";
//send id also to crete review

const createReview = async(reqData, productId, user)=>{
    const productR = await product.findById(productId);
    if(!productR) throw new Error("Product not found to create review");
    const Review = new review({
        user:user._id,
        product:productR._id,
        review:reqData.review,
        createdAt:new Date(),
    });
    await productR.save();
    return await Review.save();
}
const getAllReview = async(productId)=>{
    const Product = await product.findById(productId);
    if(!Product) throw new Error("Prodcut not found to review");
    return await review.find({product:productId}).populate("user");
};
export {createReview, getAllReview}
