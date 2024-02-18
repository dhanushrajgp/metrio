import React from "react";
import "./Formview.css";
import { useAppSelector } from "../../../reduxstore/hooks/hooks";
import { Form } from "../../../types/forms";
import {
  getDataEntries,
  getForm,
} from "../../../reduxstore/features/forms/formsSlice";
import Dataentriesview from "../../dataentries/dataentriesview/Dataentriesview";
import Closebtn from "../../common/close-btn/Close-btn";

const Formview = () => {

  const form = useAppSelector(getForm) as Form;

  console.log("form", form);

  return (
      <div className="Formview">
        <div className="previewContainer">
          <div className="FormTitle">Title:</div>
          <span className="FormValue">{form?.name}</span>
          <div className="FormTitle">DataEntries:</div>
          <Dataentriesview />
        </div>
      </div>
  );
};

export default Formview;
