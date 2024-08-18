const express = require("express");
const router = express.Router();
const { registerUser, loginUser , updateAddressDetails} = require("../controllers/authControllers");
const { requireSignin } = require('../middleware');
const {
  validateRegisterRequest,
  validateLoginRequest, 
  isRequestedValidated,
} = require("../validators/authValidator.jsx");



router.post("/register",validateRegisterRequest,isRequestedValidated, registerUser);
router.post("/login", validateLoginRequest, isRequestedValidated, loginUser);
router.put("/user/updateAddress", requireSignin, updateAddressDetails)

module.exports = router;
