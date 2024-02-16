import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";


const Layout = () => {
  return (
    <div className="pt-20 min-h-screen ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
