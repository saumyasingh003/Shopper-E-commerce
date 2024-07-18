import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Products from "./components/pages/Products";
import Orders from "./components/pages/Orders";
import { useAuth } from "./context/AuthContext";
import NotFound from "./components/NotFound";
import Layout from "./Layout";
import Category from "./components/pages/Category";

// function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? children : <Navigate to="/login" />;
// }

function App() {
  const { isAuthenticated , loading} = useAuth();
  if(loading){
    return <div>
      loading...
    </div>
  }
  return (
    <div>
      <Navbar />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="category" element={<Category />} />
              
            </Route>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
