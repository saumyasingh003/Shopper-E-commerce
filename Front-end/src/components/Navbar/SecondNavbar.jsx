import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { get } from "../../api_helpers/api_helper";
import { Link } from "react-router-dom";

export default function SecondNavbar() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await get("/category/getCategory");
      setCategories(response.categoryList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleMouseEnter = (categoryId) => {
    setOpenCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
    setOpenSubCategory(null);
  };

  const toggleSubmenu = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const toggleSubSubmenu = (subcategoryId) => {
    setOpenSubCategory(openSubCategory === subcategoryId ? null : subcategoryId);
  };

  return (
    <div className="bg-gray-500 p-3 pl-10">
      <div className="flex space-x-8">
        {categories?.map((category, index) => (
          <div key={index} className="relative group">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleSubmenu(index)}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <span className="text-white hover:text-gray-200 text-base font-small">
                {category.name}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 text-white ml-1 ${
                  openCategory === index ? "text-gray-900" : "text-white"
                }`}
              />
            </div>
            <div
              className={`absolute ${
                openCategory === index ? "block" : "hidden"
              } bg-gray-300 shadow-lg rounded-md mt-2 p-2 z-10`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col space-y-1">
                {category?.subcategory?.map((sub, subIndex) => (
                  <div key={subIndex} className="relative group">
                    <a
                      href={`/category/${sub.slug}`} 
                      className="text-gray-700 hover:bg-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                      onMouseEnter={() => toggleSubSubmenu(`${index}-${subIndex}`)}
                    >
                      {sub.name}
                    </a>
                    <div
                      className={`absolute ${
                        openSubCategory === `${index}-${subIndex}` ? "block" : "hidden"
                      } bg-gray-300 shadow-lg rounded-md mt-2 p-2 z-10 left-full top-0`}
                    >
                      <div className="flex flex-col space-y-1">
                        {sub?.subcategory?.map((subSub, subSubIndex) => (
                          <Link
                            key={subSubIndex}
                            to={`/category/${subSub.slug}`}
                            className="text-gray-700 hover:bg-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {subSub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
