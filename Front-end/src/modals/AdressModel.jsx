import React, { useState } from 'react';
import { put, post } from '../api_helpers/api_helper';
import ThankYouModal from './ThankYou';


const AddressModal = ({ isOpen, toggleModal }) => {
  const [formData, setFormData] = useState({
    address: '',
    pinCode: '',
    city: '',
    state: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await put('/user/updateAddress', formData);
      console.log('Address updated successfully:', response);
      await post('/order/placeOrder');
      setShowThankYou(true);
      setLoading(false);
      // toggleModal(); 
    } catch (err) {
      console.error('Error updating address:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h3 className="text-lg font-semibold mb-4">Enter Your Address</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-800 text-white py-2 px-4 rounded">
            {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => {
          setShowThankYou(false);
          toggleModal();
          window.location.reload(); 
        }}
      />
    </div>
  );
};

export default AddressModal;
