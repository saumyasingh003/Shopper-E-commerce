import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-4xl font-bold mb-4">
              <i>Shopper</i>
            </h3>
            <p>Shop Smart, Live Better , Your One-Stop Online Store!</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white  text-sm mb-4 uppercase">About</h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Coperate Info
                  </a>
                </li>
              </ul>
            </div>
            

            <div>
              <h4 className="text-white  text-sm mb-4 uppercase">Help</h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Payment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Shipping
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Cancellation & Return
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white text-sm mb-4 uppercase">
                Consumer policy
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Terms of use
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-xs hover:text-md hover:text-gray-300"
                  >
                    Grivancre Rederesalle
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm  mb-4">Mail Us:</h4>
              <ul>
                <p className="text-white text-xs">
                  Shopper Internet Private Limited,Buildings Alyssa, Begonia
                  &Clove Embassy Tech Village,Outer Ring Road,
                  Devarabeesanahalli Village,Bengaluru, 560103,Karnataka, India
                </p>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter className="text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn className="text-white" />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram className="text-white" />
            </a>
          </div>
          <form className="flex items-center mt-4 md:mt-0">
          
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="bg-gray-800 border border-gray-700 p-2 rounded-l text-gray-200 focus:outline-none"
            />
            <button className="bg-purple-600 text-white p-2 rounded ml-2 hover:bg-purple-700">
              Subscribe
            </button>
          </form>
        </div>
        <div className="text-center text-gray-500 mt-8">
          Made with <span className="text-red-600">&#10084;</span> &copy; All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
