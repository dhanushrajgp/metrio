import React from "react";
import "./Routebutton.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Routebutton = ({ path }: { path: string }) => {

  return <Link to={`/${path}`} className="Routebutton">
    <Button variant={"contained"}>{path}</Button></Link>;
};

export default Routebutton;
