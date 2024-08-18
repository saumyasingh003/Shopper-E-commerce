const Order = require("../models/order")
const Cart = require("../models/cart")


exports.placeOrder = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.cartItems.length === 0) {
        return res.status(500).json({ message: 'Cart is empty!' });
      }
  
      
      const totalAmount = cart.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      // Create order
      const order = new Order({
        user: userId,
        items: cart.cartItems,
        totalAmount,
        status: 'Pending'
      });
  
      await order.save();
  
      // Clear the cart
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { cartItems: [] } }
      );
  
      res.status(201).json({ message: 'Order placed successfully!', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  


exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
  
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found!' });
      }
  
      res.status(200).json({ message: 'Order status updated successfully!', order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  