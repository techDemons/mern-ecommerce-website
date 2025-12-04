import React from "react";
import "./ProductCard.css"
import { useNavigate } from "react-router-dom";


const ProductCard = ({product}) => {
  const navigate = useNavigate();

  return (
    
    <div onClick={()=>navigate(`/productDetails/${product._id}`)} className="productCard w-[14rem] m-5 transition-all cursor-pointer">
      <div className=" h-[14rem] w-[14rem]">
        <img className="h-full w-full object-cover object-left-top "
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
            <div>
                <p className="font-bold opacity-50">{product.brand}</p>
                <p>{product.title}</p>
            </div>
      
      
      <div className="flex justify-start space-x-3">
        <p className="font-semibold opacity-100">{product.discountedPrice}</p>
        <p className="line-through opacity-45">{product.price}</p>
        <p className="text-green-600 font-semibold opacity-50">{product.discountedPercent}%</p>
</div>
      </div>

    </div>
  );
};

export default ProductCard;
