import React, { useContext, useEffect } from "react";
import Formcard from "../formcard/Formcard";
import "./Formcontainer.css";
import { Form } from "../../../types/forms";
import {
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  fetchForms,
  getForms,
  getNetworkStatus,
} from "../../../reduxstore/features/forms/formsSlice";
import ErrorHandler from "../../common/errorhandler/Errorhandler";
import { useGetAllResource } from "../../../hooks/useGetAllResource";

const Formcontainer = () => {
  useGetAllResource(fetchForms());
  const formStatus = useAppSelector(getNetworkStatus);
  const data = useAppSelector(getForms);

  return (
    <>
      {data?.length > 0 ? (
        <div className="Formcontainer">
          {data?.map((form: Form) => {
            return (
              <Formcard key={form?.id} formName={form?.name} id={form?.id} />
            );
          })}
        </div>
      ) : (
        <ErrorHandler
          content="NO FORM SCHEMA WAS CREATED"
          redirectPath="createform"
          requestStatus={formStatus}
        />
      )}
    </>
  );
};

export default Formcontainer;
