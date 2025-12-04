import React from 'react'
import Navbar from "./customer/components/navigation/Navbar.jsx";
import Home from './customer/pages/homePage/Home.jsx';
import Footer from './customer/components/Footer/Footer.jsx';
import Product from './customer/components/Product/Product.jsx';
import ProductDetails from './customer/components/ProductDetails/ProductDetails.jsx';
import Cart from './customer/components/Cart/Cart.jsx';
import Checkout from './customer/components/checkout/Checkout.jsx';
import OrderDetails from './customer/components/OrderStatus/OrderDetails.jsx';
import { Route, Routes } from 'react-router-dom';
import AllRoute from './customer/Routes/AllRoutes.jsx';
import LoginForm from './customer/Auth/LoginForm.jsx';
import RegisterForm from './customer/Auth/RegisterForm.jsx';
import OrderCard from './customer/components/OrderStatus/OrderCard.jsx';
import OrderTracker from './customer/components/OrderStatus/OrderTracker.jsx';
import PaymentSuccess from './customer/components/payment/paymentSuccess.jsx';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/*"} element={<AllRoute/>}></Route>
        
      </Routes>
      {/* <Navbar/> */}
      {/* <div><Home/></div> */}
      {/* <Product/> */}
      {/* <ProductDetails/> */}
      {/* <Footer/> */} 
      {/* <Cart/> */}

      {/* <Checkout/> */}
      {/* <OrderCard/> */}
     {/* <OrderDetails/> */}
        {/* <OrderTracker/> */}

    </div>
  )
}

export default App