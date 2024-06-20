const express = require("express");
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../middleware/middleware");
const {createProduct, getProduct} = require('../controllers/admin/productController')
const multer = require('multer');
const shortid = require('shortid');
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'  ))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname) 
    }
  })
const upload = multer({storage});
  


router.post("/product/create", requireSignin, adminMiddleware,upload.array('productPicture') , createProduct);
router.get("/product/getProduct", requireSignin, getProduct);




// router.get("/category/getCategory", requireSignin, getCategories);

module.exports = router;
