import React, { useEffect } from "react";
import Formcard from "../formcard/Formcard";
import "./Formcontainer.css";
import { Form } from "../../../types/forms";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  fetchForms,
  getForms,
} from "../../../reduxstore/features/forms/formsSlice";
import Formcreate from "../formcreation/Formcreate";

const Formcontainer = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector(getForms);
  const formsStatus = useAppSelector((state) => state.forms.status);

  useEffect(() => {
    if (formsStatus === "idle") {
      dispatch(fetchForms());
    }
  }, [formsStatus, dispatch]);

  console.log(forms);

  return (
    <div className="Formcontainer">
      {forms?.map((form: Form) => {
        return <Formcard key={form?.id} formName={form?.name} />;
      })}

      <Formcreate />
    </div>
  );
};

export default Formcontainer;
