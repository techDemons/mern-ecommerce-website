import { Box, Button, Grid, IconButton, Paper, Rating, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { SizeChartDialog } from "./SizeChartDialog";
import ProductReviewCard from "./ProductReviewCard";
import LinearProgress from '@mui/material/LinearProgress';
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";
import { mens_kurta } from "../../Data/Men/Men_kurta";
import { data, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../redux/product/productSlice";
import { addItemToCart } from "../../../redux/cart/cartSlice";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "gray",
      name: "Gray",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a tdendsetter? tdy our exclusive colorway: "Black". Need to add an extda pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultda-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {


  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const {productId} = useParams();
  console.log("Prdouct id : ", productId);

  const products = useSelector(state => state.products);
   console.log("Products from productDetails: ",products?.product)
   if(!products){
    console.error(error.message||"Product not found");
   }

  const navigate = useNavigate();

const handleAddBtn = async () => {
  if (!selectedSize) {
    console.log("Please select a size before adding to cart");
    return;
  }

  const data = { productId, size: selectedSize };

  try {
    const res = await dispatch(addItemToCart(data)).unwrap();
    // console.log("Add to cart response:", res);
    navigate("/cart");
  } catch (error) {
    console.error(
      "Add to cart failed:",
      error?.message || "Error while adding item to cart"
    );
  }
};

  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);



  useEffect(()=>{
    const find = async()=>{
      try {
        await dispatch(findProductById(productId)).unwrap();
      } catch (error) {
         console.error("Product fetch failed:", error);
        console.error(
          "Error Message:",
          error?.message || "Unknown server error"
        );
      }
    }
    find();

  },[productId]);


  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {products?.product?.data?.brand}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          <img
            alt={product.images[0].alt}
            src={product.images[0].src}
            className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
          />
          <img
            alt={product.images[1].alt}
            src={product.images[1].src}
            className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
          />
          <img
            alt={product.images[2].alt}
            src={product.images[2].src}
            className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
          />
          <img
            alt={product.images[3].alt}
            src={products?.product?.data?.imageUrl}
            className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tdacking-tight text-gray-900 sm:text-3xl">
              {products?.product?.data?.brand}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
           <div className="flex gap-2 items-center">
              <p className="text-3xl font-bold tracking-tight text-gray-900">
                ₹{products?.product?.data?.price}
              </p>
              <p className="text-lg line-through opacity-50 font-medium">
                ₹{products?.product?.data?.discountedPrice}
              </p>
              <p className="font-semibold text-green-400">{products?.product?.data?.discountedPercent}% off</p> 
            </div>
            {/* Reviews */}
            <div className="mt-6">
              <div className=" flex justify-between gap-5">
                <h3 className="sr-only">Reviews</h3>
                <div className="cursor-pointer has-disabled:hover">
                  <Rating
                    name="read-only"
                    value={4.5}
                    readOnly
                  />
                  </div>
                
                <p className="cursor-pointer opacity-55 text-sm">
                  5555 Ratings{" "}
                </p>
                <p className="cursor-pointer text-indigo-700 hover:text-indigo-400">
                  69 Reviews
                </p>
                <p></p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center gap-x-3">
                    {product.colors.map((color) => (
                      <div
                        key={color.id}
                        className="flex rounded-full outline -outline-offset-1 outline-black/10"
                      >
                        <input
                          defaultValue={color.id}
                          defaultChecked={color === product.colors[0]}
                          name="color"
                          type="radio"
                          aria-label={color.name}
                          className={classNames(
                            color.classes,
                            "size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-sm cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                {/* Dialog */}
                <SizeChartDialog
                  open={isSizeChartOpen}
                  onClose={() => setIsSizeChartOpen(false)}
                />

                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {products?.product?.data?.size?.map((size) => (
                      <label
                        key={size.id}
                        aria-label={size.name}
                        className=" group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      > 
                        <input
                          value={size.name} // storing size name
                          checked={selectedSize === size.name}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          name="size"
                          type="radio"
                          disabled={size.quantity<1}
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                          {size.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <Button
              onClick={handleAddBtn}
                variant="contained"
                sx={{
                  px: "2rem",
                  py: "1rem",
                  m: "1rem",
                  bgcolor: "#9155fd",
                  "&:hover": { bgcolor: "primary.dark", boxShadow: 8 },
                }}
              >
                Add to cart
              </Button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{products?.product?.data?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
        <section className="pl-35 pb-10">
          <h3 className="font-semibold text-lg pb-8 ">
            Latest ratings and reviews
          </h3>
          <div className="border  border-amber-50 p-2">
            <Grid container spacing={1}>
        
              {/* Right Section */}
              <Grid item sx={{width:"22rem"}} xs={4}>
                <div className=" space-y-5">
                  {[1, 1, 1,1].map((item, idx) => (
                    <Paper  elevation={3}>
                      <ProductReviewCard />
                    </Paper>
                  ))}
                </div>
              </Grid>

              <Grid item xs={5} marginLeft={5}>
                {/* <div className="flex items-center space-x-3 pb-10"> */}
                <h3 className="font-semibold pb-1">Customers ratings</h3>

                  <div className="pr-15 flex items-center space-x-3">
                    <Rating value={3} precision={0.5} readOnly />
                  </div>

                <Box >
                  <Grid container alignItems={"center"}  margin={5} gap={2} paddingLeft={2}>
                    {/* Label */}
                   

                 
                    <Grid item xs={2} >
                      <Typography variant="body2">Excellent</Typography>
                   
                    </Grid>

                    {/* Progress Bar */}
                    <Box elevation={2} >
                    <Grid item xs={4} paddingLeft={"1rem"}>
                      <LinearProgress
                        variant="determinate"
                        color="success"
                        value={70} // Progress percentage
                        sx={{ height: 6,width:310, borderRadius: 2 }}
                      />
                    </Grid>

                    </Box>
                    <Grid item >5545</Grid>


                    
                  </Grid>

                  <Grid container alignItems={"center"}  margin={5} gap={2} paddingLeft={2}>
                    {/* Label */}
                   

                 
                    <Grid item xs={2} >
                      <Typography variant="body2">Nice</Typography>
                   
                    </Grid>

                    {/* Progress Bar */}
                    <Box elevation={2} >
                    <Grid item xs={4} paddingLeft={"2.8rem"}>
                      <LinearProgress
                      color="secondary"
                        variant="determinate"
                        value={70} // Progress percentage
                        sx={{ height: 6,width:310, borderRadius: 2 }}
                      />
                    </Grid>

                    </Box>
                    <Grid item >5545</Grid>

                  </Grid>

                  <Grid container alignItems={"center"}  margin={5} gap={2} paddingLeft={2}>
                    {/* Label */}
                   

                 
                    <Grid item xs={2} >
                      <Typography variant="body2">Good</Typography>
                   
                    </Grid>

                    {/* Progress Bar */}
                    <Box elevation={2} >
                    <Grid item xs={4} paddingLeft={"2.5rem"}>
                      <LinearProgress
                        color="error"
                        
                        variant="determinate"
                        value={70} // Progress percentage
                        sx={{ height: 6,width:310, borderRadius: 2 }}
                      />
                    </Grid>
  
                    </Box>
                    <Grid item >5545</Grid>
                    

                    
                  </Grid>

                  <Grid container alignItems={"center"}  margin={5} gap={2} paddingLeft={2}>
                    {/* Label */}
                   

                 
                    <Grid item xs={2} >
                      <Typography variant="body2">Satisfactory</Typography>
                   
                    </Grid>

                    {/* Progress Bar */}
                    <Box elevation={2} >
                    <Grid item xs={4} >
                      <LinearProgress
                      color="warning"
                        variant="determinate"
                        value={20} // Progress percentage
                        sx={{ height: 6,width:310, borderRadius: 2 }}
                      />
                    </Grid>

                    </Box>
                    <Grid item >5545</Grid>

                 
                    

                  
                  
                    

                    
                  </Grid>
              </Box>
              {/* </div> */}
              </Grid>
            </Grid>
                

          
             
          </div>

        </section>

        <section >
          <h2 className="text-2xl font-bold p-5">Similar product</h2>
          <div className="mt-10 justify-center flex flex-wrap space-y-10">
              {mens_kurta.map((item)=><HomeSectionCard product={item}/>)}
          </div>
        </section>
      </div>
    </div>
  );
}
