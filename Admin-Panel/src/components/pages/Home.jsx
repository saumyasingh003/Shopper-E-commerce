import React from "react";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div>
      <div className="flex justify-center items-center   ">
        <img src={logo} alt="" className="h-20 w-20" />
        <h1 className="text-center my-16 mx-32">Welcome To Admin Panel</h1>
      </div>
      <p className="text-center">
        An e-commerce dashboard is a vital component of any online retail
        website, providing a centralized interface for managing and monitoring
        various aspects of the business. It offers real-time insights into key
        performance metrics such as sales, customer behavior, inventory levels,
        and order statuses. With an intuitive layout, the dashboard allows
        administrators to track sales trends, identify top-selling products,
        manage promotional campaigns, and oversee customer service interactions.
        Advanced features may include data visualizations, detailed analytics,
        and customizable reports
    
      </p>
    </div>
  );
};

export default Home;
