import { product } from "../models/product.model.js"
import { rating } from "../models/rating.model.js";

const createRating = async(productId, ratingValue, user)=>{
    
    const productR = await product.findById(productId);
    if(!productR) throw new Error("Product not found");
    
    const Rating = new rating({
        product:productR._id,
        user:user._id,
        rating:ratingValue
    });
    return await Rating.save();

};
const productRating = async(productId)=>{
    return await rating.find({product:productId});
};

export {createRating, productRating}