import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../redux/cart/cartSlice";
const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, cartItems, loading } = useSelector(store => store.cart);

  console.log("This is cart: ",cart)
  // console.log("kjl:",cartItems);

  const handleCheckoutBtn=()=>{
    if(!cart) return;
    navigate("/checkout?step=2");
  }

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await dispatch(getCart()).unwrap();
      console.log("Cart result:", res);
    } catch (error) {
      console.error("Error fetching cart:", error?.message || error);
    }
  };

  fetchCart();
}, [dispatch]);



  return (
    <div className="grid grid-cols-3 relative">
      <div className="pb-5 col-span-2 ">

        {cart?.cartItems?.length > 0 && (
          cart.cartItems.map((item) => (
            <CartItem key={item._id} item={item}/>
          ))
        )}
        
      </div>
      <div className="pl-5 h-[70vh] mt-5  sticky top-2 space-x-2 pr-2">
        <div className="px-5 h-[50vh] bg-gradient-to-br from-gray-50 to-gray-100">
          <h2 className="uppercase font-bold ">Price details</h2>
          <Divider />
          <div className="font-semibold flex justify-between m-5 ml-10 mr-10">
            <p>Price ({cart?.totalItem +" items"})</p>
            <p>₹ {cart?.totalPrice}</p>
          </div>
          <div className="font-semibold flex justify-between m-5 ml-10 mr-10">
            <p>Discount</p>
            <p className="text-green-600">₹{cart?.discount}</p>
          </div>
          <div className="font-semibold flex justify-between m-5 ml-10 mr-10">
            <p>Delivery Charge</p>
            <p className="text-green-600">Free</p>
          </div>
          <Divider />
          <div className="font-bold flex justify-between m-5 ml-10 mr-10">
            <p>Total amount</p>
            <p className="text-green-600">₹ {cart?.totalDiscountedPrice}</p>
          </div>
          <div className="px-10">
            <Button
            onClick={handleCheckoutBtn}
              sx={{
                bgcolor: "#9155fd",
                color: "white",
                "&:hover": { bgcolor: "primary.dark", boxShadow: 8 },
                height: "3rem",
                width: "22rem",
              }}
            >
              Checkout
            </Button>
          </div>
        </div>

        <div className="flex justify-center opacity-50">
          <SecurityIcon />
          <div className="pl-2">
            <p>
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
