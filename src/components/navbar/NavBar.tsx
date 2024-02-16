import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="Navbar">
      <Link to="/">Home</Link>

      <Link to="/counter">counter</Link>

      <Link to="/forms">forms</Link>
    </div>
  );
};

export default NavBar;
