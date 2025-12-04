import { cart } from "../models/cart.model.js";
import { addCartItem, createCart, findUsersCart } from "../services/cartService.js";

const createCartController = async(req, res)=>{
    try{
        const userId = req.user._id;
        console.log("userid: ",userId);
       
        const createdCart = await createCart(userId);
        // console.log("cart: ",createdCart)
        if(!createdCart){
            return res.status(201).json({
                success:false,
                message:"User's cart can't be created"
            })
        }
        return res.status(201).json({
        success: true,
        message: "Cart created successfully",
        cart: createdCart,
        });
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"Failure in cart creation"
        })
    }
}
const findUserCart = async(req, res)=>{
    try {
        const userId = req.user._id;
        console.log("Carrt: ",userId);
        const userCart = await findUsersCart(userId);
        if(!userCart) return res.status(401).json({
            success:false,
            message:"User cart not found"
        })
        return res.status(201).json({
            success:true,
            userCart
        })
    } catch (error) {
        console.error("Error fetching user cart:", error.message);
        return res.status(error.statusCode||401).json({
            success:false,
            message: error.message || "User cart not found "
        })
    }
};
const addItemToCart = async(req, res)=>{
    const userId = req.user._id;
    try {
        const cartItem = await addCartItem(userId, req);
        // console.log(cartItem);
        if(!cartItem){
            return res.status(404).json({
                success:false,
                message:"Cart item not found"
            })
        }
        return res.status(201).json({
            success:true,
            message:"Item added to cart",
            cartItem
        })


    } catch (error) {
        return res.status(error.statusCode||401).json({
            success:false,
            message:error.message||"failure in adding item to cart"
        })
    }
};
export { addItemToCart, findUserCart, createCartController };
