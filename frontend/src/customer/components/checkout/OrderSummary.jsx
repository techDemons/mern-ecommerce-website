import React, { useEffect, useMemo } from "react";
import AddressCard from "./AddressCard";
import CartItem from "../Cart/CartItem";
import { Button, Divider } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../redux/order/orderSlice";
import { createPayment } from "../../../redux/payment/paymentSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract Redux state
  const { order, loading, error } = useSelector((state) => state.order);

  // Extract orderId from URL only once using useMemo
  const orderId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("order_id");
  }, [location.search]);
  console.log("location: ",location.search)
  console.log("ORDER ID:", orderId);
  console.log("ORDER DATA:", order);

  // Fetch order on mount or when orderId changes
  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        await dispatch(getOrderById(orderId)).unwrap();
      } catch (err) {
        console.error("Order fetch failed:", err?.message);
      }
    };

    fetchOrder();
  }, [orderId, dispatch]);

  const createdOrder = order?.createdOrder;

  const handleCheckout = async () => {
  try {
    if (!orderId) {
      console.log("Order id not found");
      return;
    }
    console.log("orderId from summry:",orderId);
   const res= await dispatch(createPayment(orderId)).unwrap();
   console.log(res)
  } catch (error) {
    console.log(error.message || "Create payment failed in OrderSummary");
  }
};

  return (
    <div className="w-full">
      {/* Address Section */}
      <div className="flex justify-center items-center">
        <div className="w-[80vh] mt-8 border-gray-200">
          
          <AddressCard/>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="font-bold mt-5">
        <p className="pl-5">Cart Items</p>

        <div className="grid grid-cols-3">
          {/* Left Column → Cart Items */}
          <div className="ml-4 col-span-2 border border-gray-200">
            {createdOrder?.orderItem?.length > 0 ? (
              createdOrder.orderItem.map((item) => (
                <CartItem key={item._id} item={item} />
              ))
            ) : (
              <p className="p-5 text-gray-500">No items found</p>
            )}
          </div>

          {/* Right Column → Price Summary */}
          <div className="pl-5 h-[70vh] mt-5 sticky top-2 pr-2">
            <div className="px-5 h-[50vh] rounded-2xl mt-4 bg-gradient-to-br from-gray-50 to-gray-100">
              <h2 className="uppercase font-bold">Price details</h2>
              <Divider />

              <div className="font-semibold flex justify-between m-5 ml-10 mr-10">
                <p>Price ({createdOrder?.totalItem??0 } items)</p>
                <p>₹{createdOrder?.totalPrice ?? 0}</p>
              </div>

              <div className="font-semibold flex justify-between m-5 ml-10 mr-10">
                <p>Discount</p>
                <p className="text-green-600">₹{createdOrder?.discount ?? 0}</p>
              </div>

              <div className="font-semibold flex justify-between m-5 ml-10 mr-10">
                <p>Delivery Charge</p>
                <p className="text-green-600">Free</p>
              </div>

              <Divider />

              <div className="font-bold flex justify-between m-5 ml-10 mr-10">
                <p>Total amount</p>
                <p className="text-green-600">
                  ₹{createdOrder?.totalDiscountedPrice ?? 0}
                </p>
              </div>

              <div className="px-10">
                <Button
                onClick={handleCheckout}
                
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

            <div className="mt-5 flex justify-center opacity-50">
              <SecurityIcon />
              <div className="pl-2">
                <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
