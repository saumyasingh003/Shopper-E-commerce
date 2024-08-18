
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import  SecondNavbar  from "./components/Navbar/SecondNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddressModal from "./modals/AdressModel";
import {Toaster} from "react-hot-toast"
import ProductListPage from "./components/products/ProductListPage";
import ProductDetailPage from "./components/products/ProductDetailsPage";
import Profile from "./components/profile/Profile";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import { get } from "./api_helpers/api_helper";


function App() {
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };
  const userId = localStorage.getItem("userId")
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await get("/user/cart/getCartItems", { userId });
     
        setCartItems(response[0].cartItems);
       
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartItems();
    
  }, [userId]);
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);
  console.log(cartCount)

  console.log("Cart Count:",cartCount)
  return (
    <div className="">
      <Toaster position="top-center" toastOptions={{duration:5000}}/>
      <Navbar cartCount={cartCount}/>
      <SecondNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetailPage onAddToCart={handleAddToCart}/>} />
        <Route path="/category/:slug" element={<ProductListPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AdressModel" element={<AddressModal />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
