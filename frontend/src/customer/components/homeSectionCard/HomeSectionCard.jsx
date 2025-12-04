import React from "react";
import "./ProductDetail.css";

const HomeSectionCard = ({product}) => {
  
  
  return (
    <div className="productCard cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 ">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <div className="textPart pl-4 pt-3 pb-8">
        <h3 className="pl-7 text-lg font-medium text-gray-900 ">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">
         {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
