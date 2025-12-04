import React, { useEffect } from "react";
import AddressCard from "../checkout/AddressCard";
import OrderTracker from "./OrderTracker";
import { Button, Grid, Rating, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../redux/order/orderSlice";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const notify = ()=>toast("Order get's cancelled");

  const { order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (!orderId) return;
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  const items = order?.createdOrder?.orderItem || [];

  // ⛔ When data is loading → show loader
  if (loading || !order) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div>
        <AddressCard />
      </div>

      <div className="mt-10 mb-5">
        <OrderTracker activeStep={1} />
      </div>

      <div className="ml-10 m-10 shadow-md px-10 rounded-2xl">
        {items.map((item, index) => {
          const product = item.product;
          const size = item.size;

          return (
            <Grid
              container
              key={index}
              px={3}
              className="mb-6"
            >
              <Grid
                item
                xs={12}
                className="flex items-center shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl justify-between p-4 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="h-[7rem] w-[7rem] flex-shrink-0">
                  <img
                    src={product?.imageUrl}
                    className="h-full w-full object-cover rounded-lg"
                    alt="product"
                  />
                </div>

                {/* Product Details */}
                <div className="ml-5 p-1 text-gray-700 flex-1">
                  <p className="font-semibold text-base leading-snug">
                    {product?.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    Size: {size} &nbsp;|&nbsp; Color: {product?.color}
                  </p>

                  <p className="text-sm text-gray-500">
                    Seller: {product?.brand}
                  </p>

                  <p className="text-lg font-bold text-green-700">
                    ₹{product?.discountedPrice}
                  </p>
                </div>

                {/* Rating */}
                <div className="mr-4">
                  <h2 className="text-sm mb-1">Rate & review</h2>
                  <Rating
                    name="half-rating-read"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                  />
                </div>

                <div>
                  <Button onClick={notify} color="error">Cancel Order</Button>
                </div>
              </Grid>
            </Grid>
          );
        })}
      </div>
      <ToastContainer/>
    </div>

  );
};

export default OrderDetails;
