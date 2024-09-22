import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../store/ProductSlice";
import { fetchCategories } from "../../store/CategorySlice";
import { Toaster, toast } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Pagination from "@mui/material/Pagination";



const Products = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [visibleProducts, setVisibleProducts] = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [productPictures, setProductPictures] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);



  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    quantity: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleVisibility = (productId) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  const handleOpenEditModal = (product) => {
    
    console.log("Modal Openend")
    setSelectedProduct(product);
    setFormValues({
      name: product?.name,
      category: product?.category._id,
      price: product?.price,
      description: product?.description,
      quantity: product?.quantity,
    });
    
    setOpenEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedProduct(null);
    setFormValues({
      name: "",
      category: "",
      price: "",
      description: "",
      quantity: "",
    });
    setProductPictures([]);
  };

  
  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };
  
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedProduct(null);
   
  };

  
  const flattenCategories = (categories) => {
    return categories.flatMap((category) => [
      category,
      ...(category.subcategory ? flattenCategories(category.subcategory) : []),
    ]);
  };

  const handleOpenImageModal = (product, index) => {
    setSelectedProduct(product);
    setOpenImageModal(true);
    setCurrentIndex(index);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const ProductDescription = ({ description }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const getTruncatedText = (text, wordLimit) => {
      const words = text?.split(" ");
      if (words?.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
    };

    const wordLimit = 5;
    const truncatedDescription = getTruncatedText(description, wordLimit);

    return (
      <td className="">
        {truncatedDescription}
        <button onClick={openModal} className="text-blue-500 ml-4 ">
          Read More...
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-7 rounded max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Product Description</h2>
                <p
                  onClick={closeModal}
                  className="text-gray-500 hover:text-black"
                >
                  &times;
                </p>
              </div>
              <p className="text-gray-700 mb-4">{description}</p>
              <button onClick={closeModal} className="text-blue-500">
                Close
              </button>
            </div>
          </div>
        )}
      </td>
    );
  };

  const renderProducts = (products) => {
    
    const [currentPage, setCurrentPage] = useState(1);
  
    const itemsPerPage = 3;

   
    

    const totalPages = Math.ceil(products?.length / itemsPerPage);

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products?.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const handleDelete = (id) => {
      dispatch(deleteProduct({ id }))
        .then(async (response) => {
          if (response.type === "products/deleteProduct/fulfilled") {
            toast.success("Product deleted successfully!");
            handleCloseDeleteModal();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            window.location.reload()
          }
        }).catch((error) => {
          toast.error("Some error occurred!")
          console.error('Failed to delete the product:', error);
        });
    };
    return (
      <>
        <div className="p-6 border rounded shadow-md bg-white mb-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Product name</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts?.map((product, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4">
                      {indexOfFirstProduct + index + 1}
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td>
                      <ProductDescription description={product.description} />
                    </td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4 uppercase">
                      {product?.category?.name}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="py-2 px-5 bg-blue-400 hover:bg-blue-800 text-white"
                        onClick={() => handleOpenImageModal(product, index)}
                      >
                        View
                      </button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openImageModal}
                        onClose={handleCloseImageModal}
                        closeAfterTransition
                      >
                        <Fade in={openImageModal}>
                          <div className="relative p-4">
                            <button
                              onClick={handleCloseImageModal}
                              className="absolute top-10 right-10 text-white bg-blue-200 rounded p-4 focus:outline-none"
                            >
                              &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-white flex justify-center">
                              {selectedProduct?.name} : Images
                            </h2>
                            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                              {selectedProduct?.productPictures?.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-center"
                                  >
                                    <img
                                      src={`https://shopper-e-commerce.onrender.com/public/${item.img}`}
                                      className="h-80 w-80 object-cover"
                                      alt={`Product Image ${index + 1}`}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </Fade>
                      </Modal>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => handleOpenEditModal(product)} 
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="py-2 px-5 bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleOpenDeleteModal(product)} 
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEditModal}
          onClose={handleCloseEditModal}
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
          <Fade in={openEditModal}>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded shadow-lg w-fit">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter product name"
                      value={formValues?.name}
                      onChange={handleChange}
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={formValues?.category}
                      onChange={handleChange}
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">None</option>
                      {flattenCategories(categories).map((category) => (
                        <option key={category?._id} value={category?._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      placeholder="Enter price"
                      value={formValues?.price}
                      onChange={handleChange}
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter description"
                      value={formValues?.description}
                      onChange={handleChange}
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="quantity"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      placeholder="Enter quantity"
                      value={formValues?.quantity}
                      onChange={handleChange}
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="productPictures"
                    >
                      Product Pictures
                    </label>
                    <input
                      type="file"
                      name="productPictures"
                      id="productPictures"
                      onChange={handleChange}
                      multiple
                      className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="mt-4 flex flex-wrap">
                      {selectedProduct?.productPictures?.map(
                        (picture, index) => (
                          <div key={index} className="relative mr-2 mb-2">
                            <img
                              src={`https://shopper-e-commerce.onrender.com/public/${picture.img}`}
                              alt={`Product ${index}`}
                              className="h-20 w-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full py-0.5 px-2"
                            >
                              &times;
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openDeleteModal}
          onClose={handleOpenDeleteModal}
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
              <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
           <div>Are you sure you want to Delete this product.</div>
           
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
                    onClick={()=> handleDelete(selectedProduct?._id)}
                  >
                    Yes
                  </button>
                </div>
            </div>
          </Fade>
        </Modal>
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </>
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productPictures") {
      setProductPictures([...productPictures, ...Array.from(files)]);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleRemoveImage = (index) => {
    const updatedPictures = productPictures.filter((_, i) => i !== index);
    setProductPictures(updatedPictures);
  };

  // const handleEditSubmit =  (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   dispatch(updateProduct({ id: selectedProduct._id, productData: formData }))
  //   formData.append("name", formValues.name);
  //   formData.append("category", formValues.category);
  //   formData.append("price", formValues.price);
  //   formData.append("description", formValues.description);
  //   formData.append("quantity", formValues.quantity);
  //   productPictures.forEach((picture, index) => {
  //   formData.append(`productPicture`, picture);
  //   });
  // }
    const handleChange = (e) => {
      const { name, value, type } = e.target;
  
      setFormValues((prevData) => ({
          ...prevData,
          [name]: type === 'number' ? parseFloat(value) : value,
      }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
     const formData = new FormData();
  

     formData.append("name", formValues.name);
       formData.append("category", formValues.category);
       formData.append("price", formValues.price);
       formData.append("description", formValues.description);
       formData.append("quantity", formValues.quantity);
       productPictures.forEach((picture, index) => {
       formData.append(`productPicture`, picture);
       });
    if (selectedProduct) {
    
      dispatch(updateProduct({id:selectedProduct?._id, productData:formData})).then((response) => {
        if (response.type === "products/updateProduct/fulfilled") {
          toast.success("Product updated successfully!");
          handleCloseEditModal();
        }
      });
    } else {
      dispatch(createProduct(formData)).then(async(response) => {
        if (response.type === "products/createProduct/fulfilled") {
          toast.success("Product added successfully!");

          handleClose();  
          await new Promise((resolve) => setTimeout(resolve, 500));
          window.location.reload() 
        }
      });
    }
  };


  const flattenedCategories = flattenCategories(categories);

  return (
    <div>
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />
        <div className="p-6 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Product Management</h1>
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
            <Fade in={open}>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-8 rounded shadow-lg w-fit">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter product name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="product"
                      >
                        category
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={formValues.category}
                        onChange={handleInputChange}
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">None</option>
                        {flattenedCategories.map((category) => (
                          <option key={category?._id} value={category?._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={formValues.price}
                        onChange={handleInputChange}
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Enter description"
                        value={formValues.description}
                        onChange={handleInputChange}
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="quantity"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        id="quantity"
                        placeholder="Enter quantity"
                        value={formValues.quantity}
                        onChange={handleInputChange}
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="productpicture"
                      >
                        Product Pictures
                      </label>
                      <input
                        type="file"
                        name="productPictures"
                        id="productPictures"
                        onChange={handleInputChange}
                        multiple
                        className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <div className="mt-4 flex flex-wrap">
                        {productPictures.map((picture, index) => (
                          <div key={index} className="relative mr-2 mb-2">
                            <img
                              src={URL.createObjectURL(picture)}
                              alt={`Product ${index}`}
                              className="h-20 w-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full py-0.5 px-2"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Fade>
          </Modal>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div className=" gap-8">{renderProducts(products)}</div>
        </div>
      </>
    </div>
  );
  }

export default Products
