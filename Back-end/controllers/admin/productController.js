const Product = require("../../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require('../../models/category');
const product = require("../../models/product");

exports.createProduct = (req, res) => {
  // res.status(200).json({file:req.files , body:req.body})

  const { name, price, description, quantity, category } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    quantity,
    category,
    createdBy: req.user._id,
  });
  product.save().then((product, error) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      return res.status(201).json({ product });
    }
  });
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find().populate("category");
    res.status(200).json({ product });
  } catch (err) {
    console.log("Error fetching data!", err);
  }
};

exports.UpdateProductController = async (req, res) => {
    const { id } = req.params;
    let productPictures = [];

    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }
    const {  name, price, description, quantity, category} = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { name, price, description, quantity, category , productPictures},
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.DeleteProduct = async (req, res)=>{
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  
  Category.findOne({ slug: slug })
    .select('_id')
    .then(category => {
      if (category) {
        console.log('Category found:', category);
        
        return Product.find({ category: category._id })
          .then(products => {
            if (products.length === 0) {
              return res.status(404).json({ message: 'No products found for this category' });
            }
            console.log('Products found:', products);
            return res.status(200).json({ products });
          })
          .catch(error => {
            console.error('Error finding products:', error);
            return res.status(400).json({ error: error.message });
          });
      } else {
        return res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(error => {
      console.error('Error finding category:', error);
      return res.status(400).json({ error: error.message });
    });
};
exports.getProductDetailsBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug }).populate('category', '_id name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error('Error finding product:', error);
    return res.status(400).json({ error: error.message });
  }
};//test krna