const slugify = require("slugify");
const Category = require("../../models/category");


function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) { 
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.name,
      subcategory: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}



exports.addCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: req.body.name
   
  };
  

  if(req.file){
    categoryObj.categoryImage = process.env.API + '/public/' +  req.file.filename; 
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  await cat.save().then((category, error) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};





exports.getCategories = (req, res) => {
  Category.find({})
    .exec()
    .then((categories) => {
      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }

      if (categories) {
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};



exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateData = {
    name: req.body.name,
    slug: req.body.name,
  };

  if (req.file) {
    updateData.categoryImage = process.env.API + '/public/' + req.file.filename;
  }

  if (req.body.parentId) {
    updateData.parentId = req.body.parentId;
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true }).exec();

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id).exec();

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};



