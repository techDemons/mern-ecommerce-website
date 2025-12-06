import { Route, Routes } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/checkout/Checkout';
import Navbar from "../components/navigation/Navbar";
import OrderDetails from '../components/OrderStatus/OrderDetails';
import Product from '../components/Product/Product';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import NotFoundPage from '../NotFoundPage';
import Home from '../pages/homePage/Home';
import PaymentSuccess from '../components/payment/PaymentSuccess';
import ProfilePage from '../pages/homePage/ProfilePage';

const AllRoute = () => {
  return (
    <div>
      
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path={"/"} element={<Home/>}></Route>
        <Route path={"/profile"} element={<ProfilePage/>}></Route>
        <Route path={"/cart"} element={<Cart/>}></Route>
        
        <Route path="/product" element={<Product />} />

        {/* One-level category */}
        <Route path="/product/:levelOne" element={<Product />} />

        {/* Two-level category */}
        <Route path="/product/:levelOne/:levelTwo" element={<Product />} />

        {/* Three-level category */}
        <Route path="/product/:levelOne/:levelTwo/:levelThree" element={<Product />} />

        <Route path={"/productDetails/:productId"} element={<ProductDetails/>}></Route>
        <Route path={"/checkout"} element={<Checkout/>}></Route>
        
        <Route path={"/account/order/:orderId"} element={<OrderDetails/>}></Route>
        <Route path={"/paymentSuccess/:orderId"} element={<PaymentSuccess/>}></Route>
        <Route path={"/login"} element={<Home/>}></Route>
                <Route path={"/register"} element={<Home/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>


      </Routes>
    </div>
  )
}

export default AllRoute
