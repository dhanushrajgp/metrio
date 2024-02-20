import React from "react";
import "./Formview.css";
import { useAppSelector } from "../../../reduxstore/hooks/hooks";
import { Form } from "../../../types/forms";
import {
  getDataEntries,
  getDeleteStatus,
  getForm,
} from "../../../reduxstore/features/forms/formsSlice";
import Dataentriesview from "../../dataentries/dataentriesview/Dataentriesview";
import { useResource } from "../../../hooks/useResource";
import { fetchFormAPI} from "../../../api/formsapi";

const Formview = () => {
  const formId = JSON.parse(localStorage?.getItem("formId") as string);
  const {data} = useResource(fetchFormAPI(formId?.id)) as unknown as {data:Form};
  
  return (
      <div className="Formview">
        <div className="previewContainer">
          <div className="FormTitle">FORM SCHEMA</div>
          <span className="FormValue">{data?.name}</span>
          <div className="FormTitle">DATA ENTRIES</div>
          <Dataentriesview />
        </div>
      </div>
  );
};

export default Formview;
