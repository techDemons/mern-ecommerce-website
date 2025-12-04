import { product } from "../models/product.model.js"
import { createMultipleProducts, createProduct, deleteProduct, findProductByid, getAllProduct, updateProduct } from "../services/productServices.js"

const createProductController = async (req, res) => {
  try {
    const { price } = req.body;
    console.log("Price: ", price);

    const createdProduct = await createProduct(req.body);

    if (!createdProduct) {
      return res.status(400).json({
        success: false,
        message: "Failed to create product",
      });
    }

    return res.status(201).json({
      success: true,
      data: createdProduct,
    });
  } catch (error) {
    console.error("Error in createProductController:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteProductController = async(req, res)=>{
    try{
        const productId = req.params.productId;
        
        const deletedProduct = await deleteProduct(productId);

        return res.status(201).send(deletedProduct);
    }catch(error){
        const statusCode = error.statusCode||401;
        return res.status(statusCode).json({
            success:false,
            message:error.message || "Failure in delete controller"
        })
    }
};
const updateProductController = async(req, res)=>{
    try{
        const productId = req.params.productId;

        const updatedProduct = await updateProduct(productId, req.body);

        if(!updatedProduct){
            return res.status(401).json({
                success:false,
                message:"Product not found to update"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }catch(error){
        const statusCode = error.statusCode||401;
        return res.status(statusCode).json({
            success:false,
            message:"Failure in controller"
        })
    }
};
const findProductByidController = async(req,res)=>{
    try{
        const productId = req.params.productId;
        const productDoc = await findProductByid(productId);
        if(!productDoc){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        return res.status(201).json({
            success:true,
            data:productDoc
        })


    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Failure in finding the product"
        });
    }
};
const getAllProductController = async(req, res)=>{
    try{
        const getAll = await getAllProduct(req.query);
        if(getAll.content.length === 0){
            return res.status(401).json({
                success:false,
                message:"Product not found"
            }
            )
        }
        return res.status(200).json({
            success:true,
            data:getAll
        })

    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message||"Failure in finding the product"
        });
    }
}
const createMultipleProductsController = async(req, res)=>{
    try{
        console.log("Req: ",req.body);
        const createdProduct = await createMultipleProducts(req.body);
        console.log("Created product: ", createdProduct);
        if(!createdProduct || createdProduct.length ==0){
            return res.status(500).json({
                success:false,
                message:"Product not found to create multiple product"
            });
        }
        return res.status(200).json({
            success:true,
            Message:"Product created ",
            data:createdProduct});

    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Failure in creating the product"
        });
    }
};
 export { createProductController, createMultipleProductsController, updateProductController, getAllProductController, deleteProductController, findProductByidController}