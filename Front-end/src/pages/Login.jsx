import React from "react";
import logo from "../components/assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://shopper-backend-api.vercel.app/login", data);
      console.log(response)
      const token = localStorage.setItem("token", response.data.token);
      const userId = localStorage.setItem("userId", response.data.user._id)
      toast.success("Signed In Successfully");
     window.location.href='/home'
    } catch (error) {
      toast.error("Something Got wrong");
      console.log(error);
    }
  } 
    return (
      <>
        <div className="flex min-h-full flex-1  justify-center px-6 py-12 lg:px-8  ">
          <div className="drop-shadow-lg bg-[#1F2937] w-[30vw] flex flex-col py-10 rounded-md shadow-xl ">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <img className="mx-auto h-12 w-12" src={logo} alt="Your Company" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              SignIn
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={loginUser}
              action="#"
              method="POST"
            >
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
                    placeholder="Enter Your email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    autoComplete="email"
                    required
                    className="block w-full  px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    autoComplete="current-password"
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
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-white">
              Not Signed In?{" "}
              <a
                href="/Register"
                className="font-semibold underline leading-6  text-amber-400 hover:text-amber-500"
              >
                Register
              </a>
            </p>
          </div>
          </div>
        </div>
      </>
    );
  };


export default Login; 
