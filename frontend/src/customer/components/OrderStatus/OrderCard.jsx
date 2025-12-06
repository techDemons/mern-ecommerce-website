import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {

  const navigate = useNavigate();
  
  return (
    <div onClick={()=>navigate(`/account/order/${69}`)} className="max-w-4xl w-[120rem] mx-auto bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl mt-5 transition-shadow duration-300 overflow-hidden">
      <div className="p-6 ">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div >
            <img
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover border border-gray-100 shadow-sm"
              src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/j/a/r/l-poch521835-peter-england-original-imag7jg47g7cxhg3-bb.jpeg?q=70"
              alt="Men slim fit high quality tshirt"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              Men Slim Fit High Quality T-Shirt
            </h3>
            <div className="space-y-1 mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Color:</span> Green
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Size:</span> L
              </p>
            </div>
          </div>

          {/* Price and Delivery Info */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
            {/* Price */}
            <div className="text-center sm:text-left">
              <p className="line-through">₹1299</p>
              <p className="text-2xl font-bold text-green-600">₹399</p>
            </div>

            {/* Delivery Info */}
            <div className="text-center sm:text-right">
              <p className="font-semibold text-gray-900 mb-1">
                Expected Delivery
              </p>
              <p className="text-sm text-green-600 font-medium">
                September 1, 2024
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Free delivery
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Track Order
            </button>
            <button className="flex-1 cursor-pointer border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              View Details
            </button>
            <button className="flex-1 cursor-pointer border border-red-300 hover:border-red-400 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;