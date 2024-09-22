import React, { useState } from "react";
import logo from "../components/assets/logo.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    role:"",
    fullname: "",
    email: "",
    password: "",
    contactNumber:"",
    
  });

  

  const registerUser = async (e) => {
    e.preventDefault();


    try {
     
      const response = await axios.post("https://shopper-e-commerce.onrender.com/register", data);
    
        console.log(response)
        toast.success("Registration Successful!! Welcome");
        navigate("/login");
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  
  return (
    <div> 
    <div className="flex min-h-full justify-center px-6 py-12 lg:px-8 ">
      <div className="drop-shadow-lg bg-[#1F2937] w-[30vw] flex flex-col py-8 rounded-md shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto  h-12 w-12" src={logo} alt="Your Company" />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register
          </h2>
        </div>
  
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={registerUser}
            action="#"
            method="POST"
          >
            <div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-white"
              >
                Role
              </label>
              <div className="mb-2">
                <select
                  id="role"
                  name="role"
                  value={data.role}
                  onChange={(e) =>
                    setData({ ...data, role: e.target.value })
                  }
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
  
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-white"
              >
                FullName
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  placeholder="FullName"
                  value={data.fullname}
                  onChange={(e) =>
                    setData({ ...data, fullname: e.target.value })
                  }
                  type="text"
                  autoComplete="fullname"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                  autoComplete="email"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium leading-6 text-white"
              >
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={data.contactNumber}
                  onChange={(e) =>
                    setData({ ...data, contactNumber: e.target.value })
                  }
                  type="text"
                  autoComplete="contactNumber"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
        
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
  
          <p className="mt-10 text-center text-sm text-white">
            Already have an account?{" "}
            <a
              href="/Login"
              className="font-semibold text-md underline leading-6  text-amber-400 hover:text-amber-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Register;
