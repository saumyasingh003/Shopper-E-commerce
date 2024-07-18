const express = require("express");
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../middleware/middleware");
const {createProduct, getProduct , getProductBySlug, getProductDetailsBySlug} = require('../controllers/admin/productController');
const { UpdateProductController , DeleteProduct} = require('../controllers/admin/productController');
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
router.put('/product/update/:id',requireSignin,adminMiddleware, upload.array('productPicture'), UpdateProductController);
router.delete('/product/delete/:id', requireSignin,adminMiddleware, DeleteProduct);


router.get("/product/:slug",  getProductBySlug);
router.get("/product/detail/:slug",  getProductDetailsBySlug);

module.exports = router;
