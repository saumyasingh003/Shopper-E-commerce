import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../api_helpers/api_helper";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ProductDetailPage = ({ onAddToCart }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    get(`/product/detail/${slug}`)
      .then((response) => {
        setProduct(response.product);
        setSelectedImage(response.product.productPictures[0]?.img || "");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);
  const handleAddToCart = () => {
    const cartItem = {
      cartItems: {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: quanity,
        img: selectedImage,
      },
    };

    post("/user/cart/addtocart", cartItem)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log("Item added to cart", data);
          onAddToCart();
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart", error);
      });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-4xl font-bold mt-10 text-red-500">
        Product Not Found
      </div>
    );
  }

  function formatIndianCurrency(price) {
    const x = price.toString().split(".");
    let lastThree = x[0].substring(x[0].length - 3);
    const otherNumbers = x[0].substring(0, x[0].length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    const result =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return x.length > 1 ? result + "." + x[1] : result;
  }

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mt-10 mx-auto px-4">
      <div className="flex">
        <div className="flex flex-col items-center overflow-y-auto h-96 w-20 mr-4">
          {product.productPictures?.map((picture, index) => (
            <img
              key={index}
              src={`http://localhost:4000/public/${picture.img}`}
              alt={product.name}
              className={`w-16 h-16 mb-4 cursor-pointer ${
                selectedImage === picture.img ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(picture.img)}
            />
          ))}
        </div>
        <div className="flex-1">
          <img
            src={`http://localhost:4000/public/${selectedImage}`}
            alt={product.name}
            className="w-96 h-76 object-cover rounded"
          />
        </div>
        <div className="flex-1 ml-4">
          <p className="text-gray-900 font-bold text-xl mb-4">
            <span className="font-bold"></span>
            {product.name}
          </p>
          <p className="text-gray-900 font-bold text-xl mb-4">
            <span className="font-bold">Price: </span>₹
            {formatIndianCurrency(product.price)}
          </p>
          <p className="text-lg mb-4">
            <span className="font-bold">Description: </span>
            {product.description}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Quantity: </span>
            {product.quantity}
          </p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full py-2 px-10 bg-[#FF9F00] text-white rounded-md hover:bg-[#FF9F00]"
            >
              <svg
                className="mr-2"
                width="16"
                height="16"
                viewBox="0 0 16 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                  fill="#fff"
                ></path>
              </svg>
              ADD TO CART
            </button>
            <button className="flex items-center justify-center w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              <span className="mr-2">Buy Now</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={decrement}
            
            >
              <FaMinus color="black"/>
            </button>
            <div className="w-12 h-10 flex items-center justify-center border border-gray-300 rounded">
              <span className="text-lg">{quantity}</span>
            </div>
            <div className="bg-gray-200 rounded-full">

            <button
              onClick={increment}
            >
              <FaPlus style={{ color: "black" }}/>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
