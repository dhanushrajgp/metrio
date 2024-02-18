import React from "react";
import "./Nodatafound.css";
import Routebutton from "../routebutton/Routebutton";

const Nodatafound = ({
  content,
  redirectPath
}: {
  content: string;
  redirectPath?:string
}) => {
  return (
    <div className="Nodatafound">
      {content}
      {redirectPath && <Routebutton path={redirectPath} />}
    </div>
  );
};

export default Nodatafound;
