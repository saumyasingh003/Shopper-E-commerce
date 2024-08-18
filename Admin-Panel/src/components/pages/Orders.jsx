import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { get } from '../../api_helpers/config';

Modal.setAppElement('#root'); 

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await get('/order/getOrders'); 
        setOrders(response.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">S. No.</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{index+1}</td>
              <td className="py-2 px-4 border-b">{order.user?.fullname}</td>
              <td className="py-2 px-4 border-b">{order.user?.email}</td>
              <td className="py-2 px-4 border-b">{order.user?.contactNumber}</td>
              <td className="py-2 px-4 border-b">{order?.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openModal(order)}
                  className="text-blue-500 hover:underline"
                >
                  View Items
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              <ul className="list-disc pl-5">
                {selectedOrder.items.map((item, index) => (
                  <li key={item._id} className="mb-2 list-decimal">
                    <p>Product: {item.product?.name || 'Unknown Product'}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                   
                  </li>
                ))}
             
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrdersTable;
