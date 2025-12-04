import { cart } from "../models/cart.model.js";
import { CartItem } from "../models/cartItem.model.js";
import { product } from "../models/product.model.js";
import { removeCartItem, updateCartItem } from "./cartItemServices.js";

const createCart = async(userId)=>{
    try {
       
        const newCart = new cart({ user: userId });
       return await newCart.save();
        
        } catch (error) {
            console.log(error.message);
        }
}
// const findUsersCart = async (userId) => {
//     const getCart = await cart.findOne({ user: userId }).populate("cartItems.product");
//       // console.log("getCart: ",getCart);
//     if (!getCart) {
//       throw new Error("Cart not found");
//     }

//     let totalPrice = 0;
//     let totalDiscountedPrice = 0;
//     let totalItem = 0;
//     let createdAt = new Date();

//         if (getCart.cartItems.length === 0) {
//           throw new Error("Some products are no longer available - cart is now empty");
//         }
//     for (let item of getCart.cartItems) {
//       totalPrice += item.price * item.quantity;
//       totalDiscountedPrice += item.discountedPrice * item.quantity;
//       totalItem += item.quantity;
//     }

//     const response = {
//       cartId: getCart._id,
//       cartItems: getCart.cartItems,
//       totalPrice,
//       totalItem,
//       discount: totalPrice - totalDiscountedPrice,
//       payableAmount: totalDiscountedPrice,
//       createdAt,
//       totalDiscountedPrice,
//     };

//     return response;

  
// };


const findUsersCart = async (userId) => {

  const getCart = await cart
    .findOne({ user: userId })
    .populate({
      path: "cartItems",
      populate: { path: "product", model: "Product" },
    });
    // console.log("getCart: ",getCart);
  if (!getCart) throw new Error("Cart not found");

  getCart.cartItems = getCart.cartItems.filter((item) => item.product);
    console.log(getCart.cartItems);
  if (getCart.cartItems.length<1)
    throw new Error("Some products are unavailable or removed");

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (let item of getCart.cartItems) {
    totalPrice += item.price * item.quantity;
    totalDiscountedPrice += item.discountedPrice * item.quantity;
    totalItem += item.quantity;
  }

  return {
    cartId: getCart._id,
    cartItems: getCart.cartItems,
    totalPrice,
    totalItem,
    discount: totalPrice - totalDiscountedPrice,
    payableAmount: totalDiscountedPrice,
    createdAt: new Date(),
    totalDiscountedPrice,
  };
};

export default findUsersCart;


const addCartItem = async (userId, req) => {
  // Check if cart exists for user
  const {productId, size, quantity=1} = req.body;

// console.log("Size: ",size)
  let newCart = await cart.findOne({ user: userId });
  if (!newCart) {
    newCart = new cart({ user: userId, cartItems: [] });
    await newCart.save();
  }

  // Check if product exists
  const Product = await product.findById(productId);
  console.log("productId: ", productId);
  if (!Product) {
    throw new Error("Product not found");
  }

  // Check if item already in cart
  let getCartItem = await CartItem.findOne({
    cart: newCart._id,
    product: Product._id,
    userId,
    size
  });
    // console.log("Get cartItem: ", getCartItem);

  if (getCartItem) {
    // If present, update quantity
    getCartItem.quantity += quantity;
    getCartItem.price = Product.price * getCartItem.quantity;
    getCartItem.discountedPrice = Product.discountedPrice * getCartItem.quantity;
    await getCartItem.save();

    return {
      updated: true,
      getCartItem
    };
  } else {
    // If not present, create new cart item
    getCartItem = new CartItem({
      product: Product._id,
      cart: newCart._id,
      userId,
      size,
      quantity,
      price: Product.price * quantity,
      discountedPrice: Product.discountedPrice * quantity
    });
    await getCartItem.save();

    // Push to cart and save
    newCart.cartItems.push(getCartItem._id);
    await newCart.save();

    return {
      updated: false,
      getCartItem
    };
  }
};
const updateCartItemController = async (req, res) =>{
  try{
    const userId = req.user._id;
    const {cartItemId} = req.params;
    const cartItemData = req.body;
    console.log(userId);
    const UpdatedCartItem = await updateCartItem(userId, cartItemId, cartItemData);
    console.log("UpdatedCart: ", UpdatedCartItem);
    return res.status(201).json({
      success:true,
      UpdatedCartItem
    })
  }catch(error){
    console.log(error.message);
    return res.status(error.status||500).json({
      success:false,
      message:error.message||"Failure in updating the cart"
    })
  }
};
const removeCartItemController = async (req, res)=>{
  try{
    const userId = req.user._id;
    console.log(userId);
    const {cartItemId} = req.params;

    const RemoveCartItem = await removeCartItem(userId, cartItemId);
    console.log(RemoveCartItem)
    return res.status(201).json({
      success:true,
      RemoveCartItem
    })
  }catch(error){
    console.log(error.message);
    res.status(error.statusCode||501).json({
      success:false,
      message:error.message||"Failure in removing the item"
    })
  }
};
const findCartItemByIdController = async (req, res) => {
    try {
        const cartItemId = req.params.cartItemId; // cartItemId from route params
        const cartItem = await findCartItemById(cartItemId);

        return res.status(200).json({
            success: true,
            data: cartItem,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message || "Cart item not found",
        });
    }
};
export { addCartItem, createCart, findCartItemByIdController, findUsersCart, removeCartItemController, updateCartItemController };

