const express = require('express')
const router = express.Router()

const { requireSignin, adminMiddleware} = require("../../middleware/middleware")

const { getAllOrders } = require('../../controllers/admin/orderController')

router.get("/order/getOrders", requireSignin,adminMiddleware, getAllOrders)

module.exports = router