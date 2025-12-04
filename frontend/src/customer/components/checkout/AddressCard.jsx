import React from "react";
import { useSelector } from "react-redux";

const AddressCard = () => {
  const {order} = useSelector((state)=>state.order);
  console.log("AddressCard: ", order?.createdOrder?.shippingAddress);
  return (
    <div>
      <div className="bg-gradient-to-br m-4 from-gray-50 to-gray-100 rounded-lg p-6 mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Address</h3>
        <h4 className="text-xl font-semibold ">{order?.createdOrder?.shippingAddress?.firstName??"firstName"+order?.createdOrder?.shippingAddress?.lastName??"lastName"}</h4>
        <p className="text-lg text-gray-600 mb-1">{order?.createdOrder?.shippingAddress?.address??"address"+" "+order?.createdOrder?.shippingAddress?.city??"city"}</p>
        <p className="text-lg text-black-700 mb-1">{order?.createdOrder?.shippingAddress?.state??"state"+" "+order?.createdOrder?.shippingAddress?.zipCode??"zipCode"}</p>
        <p className="text-lg  text-black-700">Phone: {order?.createdOrder?.shippingAddress?.mobile??"mobile"}</p>
      </div>
    </div>
  );
};

export default AddressCard;
