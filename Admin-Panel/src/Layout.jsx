import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
