import { api } from "../../api_config/api";


export const fetchProductAPi = async (reqData) => {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    discountPercent,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  const params = {
    colors: colors?.length ? colors.split(",") : undefined,
    sizes: sizes?.length ? sizes.split(",") : undefined,

    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,

    minDiscount: minDiscount ?? undefined,
    discountPercent: discountPercent ?? undefined,

    category: category ?? undefined,
    stock: stock ?? undefined,
    sort: sort ?? undefined,

    pageNumber: pageNumber ?? 1,
    pageSize: pageSize ?? 10,
  };

  const { data } = await api.get(`/api/product/getAllProduct`, { params });

  console.log("Product data: ", data);
  return data;
};

export const fetchProductByIdApi = async(productId)=>{
  console.log(productId);
   const {data}= await api.get(`/api/product/findProduct/${productId}`);
   console.log("product data with productID: ",data);
   return data;

}
