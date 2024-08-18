import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaSmileBeam } from "react-icons/fa";
const ThankYouModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-center mb-4">
          <FaSmileBeam size={40} className="text-yellow-400" />
        </div>
        <h3 className="text-lg font-semibold mb-4 text-center">Thank You!</h3>
        <p className="text-center mb-4">Your order has been placed successfully.</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-800 text-white py-2 px-4 rounded"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
