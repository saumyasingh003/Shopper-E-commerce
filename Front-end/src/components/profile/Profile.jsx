import family from "../assets/family.jpg";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { get, post, del } from "../../api_helpers/api_helper";
import { AiFillDelete } from "react-icons/ai";
import AddressModal from "../../modals/AdressModel";

const Profile = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const userInfo = {
    fullName: "Saumya Singh",
    email: "saumyasingh98982@example.com",
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await get("/user/cart/getCartItems", { userId });
        const itemsWithQuantity = response[0].cartItems.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(itemsWithQuantity);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartItems();
  }, [userId]);
  const handleDeleteItem = async (id) => {
    try {
      await del(`/user/cart/deleteCartItem/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = cartItems.reduce((sum, cartItem) => {
        return sum + cartItem.quantity * cartItem.price;
      }, 0);

      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [cartItems]);

  const handleQuantityChange = async (id, change) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );

    // Find the updated item to get its new quantity
    const updatedItem = updatedItems.find((item) => item._id === id);
    setCartItems(updatedItems);

    try {
      const cartItem = {
        cartItems: {
          product: id,

          quantity: updatedItem.quantity,
        },
      };
      await post("/user/cart/addtoCart", cartItem);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      // Revert the quantity change in case of failure
      const originalItem = cartItems.find((item) => item._id === id);
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: originalItem.quantity } : item
        )
      );
    }
  };

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  

  return (
    <div className="p-10 max-w-8xl mx-auto bg-gray-100">
      <div className="">
        <div className="flex p-6 flex-wrap mb-6">
          <div className="bg-white p-6 shadow-md rounded-lg mb-6 w-2/4 flex flex-col justify-center">
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
          <h2 className="text-2xl font-bold mb-4">
            Cart Items: {cartItems.length}
          </h2>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4">
              <div className="bg-white p-4 shadow-md rounded-lg">
                {cartItems.length > 0 ? (
                  <table className="w-full text-center align-middle bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 text-left text-sm uppercase">
                          S.No
                        </th>
                        <th className="py-2 text-left text-sm uppercase">
                          Product
                        </th>
                        <th className="py-2 text-left text-sm uppercase">
                          Quantity
                        </th>
                        <th className="py-2 text-right text-sm uppercase">
                          Amount
                        </th>
                        <th className="py-2 text-right text-sm uppercase">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={item._id} className="border-b">
                          <td className="py-2">{index + 1}</td>
                          <td className="pt-4 flex items-center">
                            <span className="truncate-text">
                              {item.product?.name
                                .split(" ")
                                .slice(0, 8)
                                .join(" ") +
                                (item.product?.name.split(" ").length > 8
                                  ? "..."
                                  : "")}
                            </span>
                          </td>
                          <td className="py-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, -1)
                                }
                                className="p-1 border border-gray-300 rounded"
                              >
                                <FaMinus color="black" size="14" />
                              </button>
                              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded">
                                <span className="text-lg">{item.quantity}</span>
                              </div>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, 1)
                                }
                                className="p-1 border border-gray-300 rounded"
                              >
                                <FaPlus style={{ color: "black" }} size="14" />
                              </button>
                            </div>
                          </td>
                          <td className="py-2">
                            {formatIndianCurrency(item.price * item.quantity)}
                          </td>
                          <td className="py-2 flex justify-center">
                            <button onClick={() => handleDeleteItem(item._id)}>
                              <AiFillDelete size={24} color="red" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items in the cart.</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full px-2 mb-2 mt-1 flex justify-end">
            <div className="bg-white p-3 shadow-md rounded-lg flex flex-col justify-between w-full md:w-1/3">
              <h2 className="font-semibold">Total Amount</h2>
              <p>Amount: ₹ {formatIndianCurrency(totalAmount)}</p>
              <p>Shipping Charges: ₹ 50</p>
              <br />
              <hr />
              <br />
              <p>Total Amount: ₹ {formatIndianCurrency(totalAmount + 50)}</p>
              <button
                onClick={toggleModal}
                className="bg-green-800 text-white py-2 px-1 rounded mt-4"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
<AddressModal toggleModal = {toggleModal} isOpen = {isModalOpen} />
    </div>
  );
};

export default Profile;
