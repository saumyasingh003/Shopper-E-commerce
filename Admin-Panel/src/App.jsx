import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from  "./components/pages/Home";
import  Login from  "./components/pages/Login";
import Register from  "./components/pages/Register";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} /> 
      </Routes>
    </div>
  );
}

export default App;
