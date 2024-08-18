const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).then((cart, error) => {
    if (error) return res.status(400).json({ error });
    console.log(req.body);
    // if cart already exists, update the cart by adding the new item
    const product = req.body.cartItems.product;
    if (cart) {
      const item = cart.cartItems.find((c) => c.product == product);
      console.log("Item", item);
      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          },
          { new: true }
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
            $push: {
              cartItems: {
                ...req.body.cartItems,
              },
            },
          },
          { new: true }
        ).then((_cart, error) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      }
    } else {
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

exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.query;
    const cartItems = await Cart.find({ user: userId })
      .populate("cartItems.product")
      .exec();
    res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCartItem = async (req, res) => {
  console.log("Api call started");
  const user = req.user;
  console.log("User:", user);
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      res.status(404).json({ message: "Cart not found!" });
    }
    console.log(cart)
    const itemIndex = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1) {
      res.status(404).json({ message: "Product Not found in the cart!" });
    }
    cart.cartItems.splice(itemIndex, 1);
    if (cart.cartItems.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
    } else {
      await cart.save();
    }
    res.status(200).json({ message: "Cart Item deleted successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
