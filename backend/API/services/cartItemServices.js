import { getUserById } from "../controllers/user.js";
import { CartItem } from "../models/cartItem.model.js";



const updateCartItem = async (userId, cartItemId, cartItemData) => {
  // Populate product to get price info
  const item = await CartItem.findById(cartItemId).populate("product");
  if (!item) throw { status: 404, message: "Cart item not found" };

  if (!item.userId) throw { status: 500, message: "CartItem missing userId" };

  // Check authorization
  if (item.userId.toString() !== userId.toString())
    throw { status: 403, message: "Not authorized to update this item" };

  // Validate quantity
  const quantity = Number(cartItemData.quantity);
  if (isNaN(quantity) || quantity < 1)
    throw { status: 400, message: "Invalid quantity" };

  // Update cart item
  item.quantity = quantity;
  item.price = Number(item.product.price) * quantity; // ensure number
  item.discountedPrice = Number(item.product.discountedPrice) * quantity; // ensure number

  return await item.save();
};
const removeCartItem = async(userId, cartItemId)=>{
    
        const item = (await findCartItemById(cartItemId));
        if(!item) throw {status:401, message:"Item not found"};
        
        // const User = await getUserById(item.userId);
       
        if(!item.userId) throw {status:401, message:"User not found"};
        if(item.userId.toString()!==userId.toString()) throw {status:403, message:"User is not authorised to remove this item"}
        await item.deleteOne();
        return {message:"item removed from cart"};
   
    
};
const findCartItemById = async(cartItemId)=>{
    const cartItem = await CartItem.findById(cartItemId);
    if(cartItem){
        return cartItem
    }else{
        throw new Error("cartitem not found with this id", cartItemId);
    }
}
export {updateCartItem, removeCartItem, findCartItemById}

