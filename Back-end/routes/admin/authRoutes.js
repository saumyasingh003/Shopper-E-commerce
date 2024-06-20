const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../../controllers/admin/authController.js");
// const { requireSignin } = require('../middleware');
const {
  validateRegisterRequest,
  validateLoginRequest, 
  isRequestedValidated,
} = require("../../validators/authValidator.jsx");



router.post("/admin/register",validateRegisterRequest,isRequestedValidated, registerAdmin);
router.post("/admin/login", validateLoginRequest, isRequestedValidated, loginAdmin);

module.exports = router;
