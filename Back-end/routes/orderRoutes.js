const express = require('express')
const router = express.Router()
const { requireSignin } = require('../middleware')
const {placeOrder} = require("../controllers/orderController")

router.post("/order/placeOrder", requireSignin, placeOrder)

module.exports = router