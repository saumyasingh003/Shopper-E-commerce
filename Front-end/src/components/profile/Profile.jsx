import family from "../assets/family.jpg";
import { FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";

const Profile = () => {
  const userInfo = {
    fullName: "Saumya Singh",
    email: "saumyasingh98982@example.com",
  };

  const cartItems = [
    { id: 1, item: "Headphones" },

    // Add more cart items as needed
  ];

  //   const Cart = ({ cartItems }) => {
  //   const totalAmount = cartItems.reduce((total, item) => total + item.amount * item.quantity, 0);
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-10 max-w-8xl mx-auto  bg-gray-100">
      <div className="">
        <div className="flex p-6  flex-wrap mb-6 ">
          <div className="bg-white p-6 shadow-md rounded-lg  mb-6 w-2/4 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-2">My Profile</h2>
            <p className="mb-1">
              <strong>Full Name:</strong> {userInfo.fullName}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Cart Items: 1</h2>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-2/3 px-2 mb-4">
              <div className="bg-white p-4 shadow-md rounded-lg">
                {cartItems.length > 0 ? (
                  <table className="w-full text-center align-middle bg-white">
                  <thead>
  <tr>
    <th className="py-2 text-left">S.No</th>
    <th className="py-2 text-left">Product</th>
    <th className="py-2 text-left">Quantity</th>
    <th className="py-2 text-left">Amount</th>
  </tr>
</thead>
<tbody>
  {cartItems.map((item, index) => (
    <tr key={item.id} className="border-b">
      <td className="py-2">{index + 1}</td>
      <td className="py-2 flex items-center">
        {/* <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" /> */}
        Men Skinny Mid Rise Dark Blue Jeans
      </td>
      <td className="py-2">
        <div className="flex items-center space-x-2">
          <button onClick={decrement} className="p-1 border border-gray-300 rounded">
            <FaMinus color="black" size="14" />
          </button>
          <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded">
            <span className="text-lg">{quantity}</span>
          </div>
          <button onClick={increment} className="p-1 border border-gray-300 rounded">
            <FaPlus style={{ color: "black" }} size="14" />
          </button>
        </div>
      </td>
      <td className="py-2">Rs 13,000</td>
    </tr>
  ))}
</tbody>  

                  </table>
                ) : (
                  <p>No items in the cart.</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2 mb-2 mt-1">
              <div className="bg-white p-3 shadow-md rounded-lg flex flex-col justify-between">
                <h2 className="font-semibold">Total Amount</h2>
                <p>Amount: Rs 26,000</p>
                <p>Shipping Charges: Rs 500</p>
                <br/>
                <hr/>
                <br/>
                <p>Total Amount: Rs 26,500</p>
                <button className="bg-green-800 text-white py-2 px-1 rounded mt-4">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
