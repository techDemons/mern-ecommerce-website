import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoutes.js";
import cartItemRoutes from "./routes/cartItemRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import ratingRoutes from "./routes/ratingRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import addressRoutes from "./routes/addressRoutes.js"
import razorpayRoutes from "./routes/razorpayRoutes.js"
import bodyParser from "body-parser"
import dotenv from "dotenv";
dotenv.config();

connectDB();
const PORT = process.env.PORT||9696
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], 
  credentials: true               
}));


app.use("/auth",userRoute);
app.use("/api/cartItem",cartItemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment",razorpayRoutes);

app.get("/", (req, res)=>{
    return res.send("Welcome to ecommerce website");
});

// app.listen(PORT, ()=>{
//     console.log(`Server started at ${PORT}`);
// })
