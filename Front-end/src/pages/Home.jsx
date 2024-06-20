import React from "react";
import Carousel from "./Carousel";
import img2 from "../components/assets/img2.png";

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden md:h-full " >
        <div>
          <div className="relative shadow-xl m-10 rounded-lg overflow-hidden">
            <Carousel />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
