const Order = require("../../models/order")
const User = require("../../models/user")


exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate([{
          path: 'user',
          select: 'fullname email contactNumber'
        },{
            path:'items.product',
            select:"name price"
        }])
        .exec();
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };