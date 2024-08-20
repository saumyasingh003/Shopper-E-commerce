import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../api_helpers/api_helper';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    get(`/product/${slug}`)
      .then(response => {
        setProducts(response.products);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-4xl font-bold mt-10 text-red-500"> No Product Found</div>;
  }
  function formatIndianCurrency(price) {
    const x = price.toString().split('.');
    let lastThree = x[0].substring(x[0].length - 3);
    const otherNumbers = x[0].substring(0, x[0].length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return x.length > 1 ? result + "." + x[1] : result;
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };


  return (
    <div className="container mx-auto px-6">
    <h1 className="text-2xl font-bold my-2 text-center">Product List for {slug}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {products?.map((product, index) => (
        <div className=" p-6 rounded-lg bg-gray-100 shadow-md" key={index}>
          {product.productPictures?.length > 0 && (
            <img
              src={`https://shopper-backend-api.vercel.app/public/${product.productPictures[0]?.img}`}
              alt={product.name}
              className="w-64 h-40  mb-4 rounded w-f"
            />
          )}
          <h2 className="text-sm mb-2">
      {truncateText(product.name, 5)}
    </h2>
          <p className="text-gray-900 text-sm  text-bolder  mb-4">
  <p className="font-bold"> </p>₹{formatIndianCurrency(product.price)}
</p>
          <div className='flex justify-center'>
          <Link to={`/product/${product.slug}`}>
                <button className="mt-4 bg-blue-500 text-sm text-white py-1 px-1 rounded hover:bg-blue-600">
                  View Details
                </button>
              </Link>
          </div>
          
        </div>
      ))}
    </div>
  </div>
);
};

export default ProductListPage;
