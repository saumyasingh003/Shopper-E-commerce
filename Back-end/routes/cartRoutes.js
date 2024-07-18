const express = require("express");
const router = express.Router();
const { addItemToCart } = require("../controllers/cartController");
const { requireSignin, userMiddleware } = require("../middleware/middleware");

router.post("/user/cart/addtocart",requireSignin,userMiddleware,addItemToCart);

module.exports = router;
