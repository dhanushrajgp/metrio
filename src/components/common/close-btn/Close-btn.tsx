import React from "react";
import "./Close-btn.css";
import { Close } from "@mui/icons-material";

const Closebtn = ({onClick}:{onClick:()=> void}) => {
  return (
    <div className="Close" onClick={onClick}>
      <Close />
    </div>
  );
};

export default Closebtn;
