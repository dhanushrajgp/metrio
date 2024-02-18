import React, { useContext, useEffect } from "react";
import Formcard from "../formcard/Formcard";
import "./Formcontainer.css";
import { Form } from "../../../types/forms";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  fetchForms,
  getDeleteStatus,
  getForms,
} from "../../../reduxstore/features/forms/formsSlice";
import Formcreate from "../formcreation/Formcreate";
import Formview from "../formview/Formview";
import Nodatafound from "../../common/nodatafound/Nodatafound";

const Formcontainer = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector(getForms);
  const formsStatus = useAppSelector((state) => state.forms.status);
  const getdeleteStatus = useAppSelector(getDeleteStatus);
  useEffect(() => {
    if (formsStatus === "idle") {
      dispatch(fetchForms());
    }
  }, [formsStatus, dispatch]);

  console.log(formsStatus);
  console.log(forms);

  return (
    <>
      {forms?.length > 0 ? (

        <div className="Formcontainer">
          {forms?.map((form: Form) => {
            return (
              <Formcard key={form?.id} formName={form?.name} id={form?.id} />
            );
          })}
        </div>
      ) : formsStatus == "failed" ? (
        <Nodatafound content="503 SERVICE UNAVAILABLE. CONNECT SERVER TO FETCH THE DATA"></Nodatafound>
      ) : (
        <Nodatafound
          content="NO FORM SCHEMA WAS CREATED"
          redirectPath="createform"
        />
      )}
      {getdeleteStatus == "deleting" && <div>Deleting....</div>}
    </>
  );
};

export default Formcontainer;
