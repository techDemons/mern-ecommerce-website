import { findOrderId } from "../controllers/orderController.js";
import { address } from "../models/address.model.js";
import { cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { orderItem } from "../models/orderItem.model.js";
import { findUsersCart } from "./cartService.js";


const createOrder = async (user, shippingAddressInput) => {

  let shippingAddress;

  // -----------------------------
  // A. If existing addressId provided
  // -----------------------------
  if (shippingAddressInput._id) {
    shippingAddress = await address.findById(shippingAddressInput._id);

    if (!shippingAddress) throw new Error("Shipping address not found");

    if (shippingAddress.user.toString() !== user._id.toString()) {
      throw new Error("Shipping address does not belong to user");
    }
  }

  // -----------------------------
  // B. If new address object provided
  // -----------------------------
  else {
    shippingAddress = new address({
      ...shippingAddressInput,
      user: user._id,
    });

    await shippingAddress.save();

    // push address to user's address list
    if (!user.addresses) user.addresses = [];
    user.addresses.push(shippingAddress._id);
    await user.save();
  }

  // -----------------------------
  // C. Fetch user's cart
  // -----------------------------
  const userCart = await findUsersCart(user._id);
  if (!userCart || !userCart.cartItems?.length)
    throw new Error("Cart is empty");

  // -----------------------------
  // D. Prepare Order Items
  // -----------------------------
  const orderItemsData = userCart.cartItems.map((item) => {
    if (!item.product || !item.product._id) {
      throw new Error(`Product missing for cart item: ${item._id}`);
    }

    return {
      price: item.price,
      product: item.product._id,
      quantity: item.quantity,
      size: item.size,
      discountedPrice: item.discountedPrice,
      userId: item.userId,
    };
  });

  const createdOrderItems = await orderItem.insertMany(orderItemsData);

  // -----------------------------
  // E. Create main Order document
  // -----------------------------
  const newOrder = await Order.create({
    user: user._id,
    orderItem: createdOrderItems.map((oi) => oi._id),
    totalPrice: userCart.totalPrice,
    totalDiscountedPrice: userCart.totalDiscountedPrice,
    totalItem: userCart.totalItem,
    shippingAddress: shippingAddress._id,
    paymentDetail: {
      paymentStatus: "PENDING",
    },
  });

  // -----------------------------
  // F. Empty the cart after success
  // -----------------------------
  await cart.updateOne(
    { user: user._id },
    {
      $set: {
        cartItems: [],
        totalPrice: 0,
        totalDiscountedPrice: 0,
        discount: 0,
        totalItem: 0,
      },
    }
  );

  return newOrder;
};


const placeOrder = async(orderId)=>{
  const order = await findOrderId(orderId);

  order.orderStatus="PLACED";
  order.paymentDetails.status="COMPLETED";

  return await order.save();
};
const confirmedOrder = async(orderId)=>{
  const order = await findOrderId(orderId);

  order.orderStatus="CONFIRMED";
 

  return await order.save();
};
const shipOrder = async(orderId)=>{
  const order = await findOrderId(orderId);

  order.orderStatus="SHIPPED";
 

  return await order.save();
};
const deliverOrder = async(orderId)=>{
  const order = await findOrderId(orderId);

  order.orderStatus="DELIVERED";

  return await order.save();
};
const cancelOrder = async(orderId)=>{
  const order = await findOrderId(orderId);

  order.orderStatus="CANCELED";

  return await order.save();
};
const findOrderByid = async(orderId)=>{
  const order = await Order.findById(orderId).populate("user").populate({path:"orderItem", populate:{path:"product"}})
  .populate("shippingAddress");
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};


export { cancelOrder, confirmedOrder, createOrder, deliverOrder, findOrderByid, placeOrder, shipOrder };

