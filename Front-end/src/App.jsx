
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <div className="">
      <Toaster position="top-center" toastOptions={{duration:5000}}/>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
