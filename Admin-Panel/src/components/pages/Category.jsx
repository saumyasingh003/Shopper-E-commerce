import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory, deleteCategory } from "../../store/CategorySlice";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { CiCirclePlus } from "react-icons/ci";
 import { MdDelete } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, error, loading } = useSelector((state) => state.category);
  const [visibleCategories, setVisibleCategories] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    parentId: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleVisibility = (categoryId) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const flattenCategories = (categories) => {
    return categories.flatMap((category) => [
      category,
      ...(category.subcategory ? flattenCategories(category.subcategory) : []),
    ]);
  };


  const handleOpenDeleteModal = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };
  
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedCategory(null);
   
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory({ id }))
      .then(async (response) => {
        if (response.type === "category/deleteCategory/fulfilled") {
          toast.success("Category deleted successfully!");
          handleCloseDeleteModal();
          await new Promise((resolve) => setTimeout(resolve, 1000));
          window.location.reload()
        }
      }).catch((error) => {
        toast.error("Some error occurred!")
        console.error('Failed to delete the category:', error);
      });
  };


  const renderCategories = (categories) => {
    return categories.map((category) => (
      <div key={category._id} className="p-4 border rounded shadow-md bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{category.name}</h2>
          
          <div className="flex items-center space-x-2">
          <button className="text-red-500 text-2xl hover:text-red-700 px-2 py-2" onClick={() => handleOpenDeleteModal(category)}   >
              <MdDelete/>
            </button>
            {category.subcategory && category.subcategory.length > 0 && (
              <span
                onClick={() => toggleVisibility(category._id)}
                className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
              >
                {visibleCategories[category._id] ? (
                  <FiMinusCircle size={22} />
                ) : (
                  <CiCirclePlus size={22} />
                )}
              </span>
            )}
          </div>
        </div>
        {visibleCategories[category._id] && category.subcategory && (
          <div className="mt-4 pl-4 border-l border-gray-300">
            <ul className="list-disc ml-4 mt-2">
              {renderCategories(category.subcategory)}
            </ul>
          </div>
        )}
      </div>
    ));

  };




  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormValues({ ...formValues, image: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("parentId", formValues.parentId);
      if (formValues.image) {
        formData.append("categoryImage", formValues.image);
      }

      dispatch(createCategory(formData));
      if (loading === false) {
        handleClose();
        toast.success("Category added successfully!");
      }
    } catch (err) {
      console.log("error adding category:", err);
    }
  };

  const flattenedCategories = flattenCategories(categories);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
      <div className="p-6 bg-gray-100 ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Category Management</h1>
          <button
            className="bg-green-800 text-white py-2 px-4 rounded flex items-center"
            onClick={handleOpen}
          >
            Add New
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter category name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="parentId"
                  >
                    Parent Category
                  </label>
                  <select
                    name="parentId"
                    id="parentId"
                    value={formValues.parentId}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">None</option>
                    {flattenedCategories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Category Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Update Category</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter category name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="parentId"
                  >
                    Parent Category
                  </label>
                  <select
                    name="parentId"
                    id="parentId"
                    value={formValues.parentId}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">None</option>
                    {flattenedCategories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Category Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderCategories(categories)}
        </div>
      </div>
          
  <Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={openDeleteModal}
  onClose={handleCloseDeleteModal}
  sx={{
    position: "absolute",
    top: "20%",
    overflow: "auto",
    height: "70vh",
  }}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
>
  <Fade in={openDeleteModal}>
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded shadow-lg w-fit">
      <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
   <div>Are you sure you want to Delete this category.</div>
   
        <div className="flex items-center gap-2  justify-end">
          <button
            type="button"
            onClick={handleCloseDeleteModal}
            className="bg-green-500 text-white mt-5 py-2 px-4 rounded"
          >
            No
          </button>
          <button
            type="button"
            className="bg-red-500 text-white mt-5 py-2 px-4 rounded"
            onClick={()=> handleDelete(selectedCategory?._id)}
          >
            Yes
          </button>
        </div>
    </div>
  </Fade>
</Modal>
    </>
  );
};

export default Category;
