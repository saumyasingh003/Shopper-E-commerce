const express = require("express");
const router = express.Router();
const { addItemToCart, getCartItems, deleteCartItem } = require("../controllers/cartController");
const { requireSignin, userMiddleware } = require("../middleware/middleware");

router.post("/user/cart/addtocart",requireSignin,userMiddleware,addItemToCart); 
router.get("/user/cart/getCartItems", requireSignin, userMiddleware, getCartItems) 
router.delete("/user/cart/deleteCartItem/:productId", requireSignin, userMiddleware, deleteCartItem) ;


module.exports = router;
 