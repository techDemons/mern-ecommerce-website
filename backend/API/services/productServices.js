import mongoose from "mongoose";
import { category } from "../models/category.model.js"
import { product } from "../models/product.model.js";


const createProduct = async(reqData)=>{
    let topLevel = await category.findOne({name:reqData.topLevelCategory});
    // console.log("Category: ", topLevel);
    if(!topLevel){
        topLevel = new category({
            name:reqData.topLevelCategory,
            level:1
        });
        await topLevel.save();
    }

    let secondLevel = await category.findOne({name:reqData.secondLevelCategory,
        parentCategory:topLevel._id
    });
    if(!secondLevel){
        secondLevel = new category({
            name:reqData.secondLevelCategory,
            parentCategory:topLevel._id,
            level: 2
        });
        console.log("2ndlevel ", secondLevel);
        await secondLevel.save()
    }

    let thirdLevel = await category.findOne({name:reqData.thirdLevelCategory,
        parentCategory:secondLevel._id
    })
    if(!thirdLevel){
        thirdLevel = new category({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3
        });
        console.log("Third levle", thirdLevel);
        await thirdLevel.save();
    }

    let newProduct = new product({
        title:reqData.title,
        description:reqData.description,
        brand:reqData.brand,
        color:reqData.color,
        size:reqData.size,
        price:reqData.price,
        imageUrl:reqData.imageUrl,
        discountedPercent:reqData.discountedPercent,
        discountedPrice:reqData.discountedPrice,
        category:thirdLevel._id,
        quantity:reqData.quantity
    });
    console.log(newProduct);
    return await newProduct.save();
};
const deleteProduct = async(productId)=>{

    try {
        const productToDelete = await product.findById(productId).populate("category").exec();
        const deletedProduct = await product.findByIdAndDelete(productId);
        
        if(!productToDelete){
            throw new Error("Product not founddd");
        }
        return {
      success: true,
      message: "Product deleted successfully",
      data: productToDelete,
    };

    } catch (error) {
        throw new Error(error.message||"Failure in deleting the product");
    }
    
};
const updateProduct = async(productId, reqData)=>{
    return await product.findByIdAndUpdate(productId, reqData,{new:true});
};
const getAllProduct = async(reqQuery)=>{

    try{
    let {color, category:categoryName, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber = 1, pageSize = 10,} = reqQuery;
    

    let query = product.find().populate("category");
    if(categoryName){
        const existCategory = await category.findOne({name:categoryName});
        if (!existCategory) {
        return { content: [], currentPage: 1, totalPages: 0 };
      }
      query = query.where("category").equals(existCategory._id);
    }

    if (color) {
      const colorSet = [...new Set(color.split(",").map(c => c.trim().toLowerCase()))];
      if (colorSet.length > 0) {
        const colorRegex = new RegExp(colorSet.join("|"), "i");
        query = query.where("color").regex(colorRegex);
      }
    }

    if(sizes){
        const sizeSet = [...new Set(sizes.split(","))];
        if(sizeSet.length>0){
        query.query.where("sizes.name").in(sizeSet);}
    }
    if (minPrice || maxPrice) {
      let priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      query = query.where("discountedPrice", priceFilter);
    }
    if(minDiscount){
        query = query.where("discountedPercent").gte(Number(minDiscount));

    }
    if(stock){
        if(stock=="in_stock"){
            query= query.where("quantity").gt(0);

        }else if(stock=="out_of_stock"){
            query = query.where("quantity").lte(0);
        }
    }
    if (sort) {
      let sortOption = {};
      if (sort === "price_high") {
        sortOption.discountedPrice = -1;
      } else if (sort === "price_low") {
        sortOption.discountedPrice = 1;
      } else if (sort === "newest") {
        sortOption.createdAt = -1;
      }
      query = query.sort(sortOption);
    }
    const totalProducts = await product.countDocuments(query.getFilter());
    const skip = (pageNumber-1)*pageSize;

    query = query.skip(skip).limit(pageSize);
    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts/pageSize);
    return {content:products, currentPage:Number(pageNumber), totalPages, totalProducts}
    } catch (error) {
    console.error("Error in getAllProduct:", error);
    throw new Error("Failed to fetch products");
  }
};
const findProductByid = async(id)=>{
    const productD = await product.findById(id).populate("category").exec();
    if(!productD){
        throw new Error("Product not found with this id");

    };
    return productD;
}
const createMultipleProducts = async(products)=>{
    const createdProduct = await Promise.all(products.map((product)=>createProduct(product)));

    return createdProduct;
};

export {createProduct, findProductByid,createMultipleProducts, deleteProduct, updateProduct, getAllProduct}
