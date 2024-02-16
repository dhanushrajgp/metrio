import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to="/">Home</Link>

      <Link to="/counter">counter</Link>

      <Link to="/forms">forms</Link>
    </div>
  );
};

export default Navbar;
