const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).then((cart, error) => {
    if (error) return res.status(400).json({ error });
    console.log(req.body)
    // if cart already exists, update the cart by adding the new item
    const product = req.body.cartItems.product
    if (cart) {
      const item = cart.cartItems.find((c) => c.product == product); 
      console.log("Item", item)
      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product }, 
          {
            '$set': {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            }, 
          },
          {new:true}
        ).then((_cart, error) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            '$push': {
              'cartItems': {
                ...req.body.cartItems,
              },
            },
          },
          {new:true}
        ).then((_cart, error) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      }
    } else {
      // if cart does not exist, create a new one
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save().then((cart, error) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
