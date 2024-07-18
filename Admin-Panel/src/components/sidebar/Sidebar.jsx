import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="flex ">
        <div className="w-64 h-[89vh] bg-gray-800 text-white p-4 overflow-hidden">
          <div className="mb-8">
            <h1 className="text-center text-xl font-bold">Admin Panel</h1>
          </div>
          <ul>
            <li className="mb-4">
              <a
                href="/home"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/category"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Category
              </a>
            </li>

            <li className="mb-4">
              <a
                href="/products"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Products
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/orders"
                className="block p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                0rders
              </a>
            </li>
          </ul>
        </div>{" "}
      </div>
    </div>
  );
};

export default Sidebar;
