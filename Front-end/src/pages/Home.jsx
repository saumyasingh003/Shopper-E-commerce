import React from "react";
import Carousel from "./Carousel";
import mac from "../components/assets/mac.jpg";
import grocery2 from "../components/assets/grocery2.jpg";
import grocery1 from "../components/assets/grocery1.jpg";
import grocery3 from "../components/assets/grocery3.jpg";

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden md:h-full ">
        <img
          src={mac}
          alt="Full width and height"
          className="w-full h-[36em] "
        />

        <div className="flex justify-center items-center py-10">
          <div className="flex space-x-4">
            <button className="bg-gray-500 text-white px-8 py-4 rounded-full">
              Watch the film
            </button>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-full">
              Learn More
            </button>
          </div>
        </div>

        <h1 class="text-5xl font-bold text-center bg-[#945600] bg-clip-text text-transparent my-8">
          Discover Your Style
        </h1>

        <div className="relative shadow-xl m-10 rounded-lg overflow-hidden">
          <Carousel />
        </div>

        <h1 class="text-5xl font-bold text-center bg-[#0D5D56] bg-clip-text text-transparent my-8">
          All You Need at One Place...
        </h1>
        <div class="flex justify-center gap-16 ">
          <img
            src={grocery1}
            alt="Image 1"
            class="w-full max-w-xs h-auto rounded-lg object-cover"
          />
          <img
            src={grocery2}
            alt="Image 2"
            class="w-full max-w-xs h-auto rounded-lg object-cover"
          />
          <img
            src={grocery3}
            alt="Image 3"
            class="w-full max-w-xs h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
