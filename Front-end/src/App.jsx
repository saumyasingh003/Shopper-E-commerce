
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import  SecondNavbar  from "./components/Navbar/SecondNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast"
import ProductListPage from "./components/products/ProductListPage";
import ProductDetailPage from "./components/products/ProductDetailsPage";
import Profile from "./components/profile/Profile";
import { useState } from "react";
import Footer from "./components/Footer/Footer";


function App() {
  const [cartCount, setCartCount] = useState(0)
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };
  return (
    <div className="">
      <Toaster position="top-center" toastOptions={{duration:5000}}/>
      <Navbar cartCount={cartCount}/>
      <SecondNavbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetailPage onAddToCart={handleAddToCart}/>} />
        <Route path="/category/:slug" element={<ProductListPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
