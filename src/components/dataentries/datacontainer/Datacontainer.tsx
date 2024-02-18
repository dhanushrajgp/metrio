import React, { useContext, useEffect, useState } from "react";

import "./Datacontainer.css";
import { DataEntries, Form } from "../../../types/forms";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../reduxstore/hooks/hooks";
import {
  fetchAllData,
  fetchForms,
  getAllData,
  getForms,
} from "../../../reduxstore/features/forms/formsSlice";
import Datacard from "../datacard/Datacard";
import Nodatafound from "../../common/nodatafound/Nodatafound";

const Datacontainer = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getAllData);
  const [requestStatus, setRequestStatus] = useState("idle");
  const formsStatus = useAppSelector((state) => state.forms.status);

  useEffect(() => {
    if (requestStatus === "idle") {
      dispatch(fetchAllData());
      setRequestStatus("completed");
    }
  }, [requestStatus, dispatch]);

  return (
    <div className="Datacontainer">
      {
        data?.length > 0 ?
        data?.map((item: DataEntries) => {
          return (
            <Datacard
              id={item?.id}
              key={item?.id}
              note={item?.note}
              date={item?.date}
              tags={item?.tags}
              value={item?.value}
            />
          );
        })
        :
        formsStatus == "failed" ?
        <Nodatafound content="503 SERVICE UNAVAILABLE. CONNECT SERVER TO FETCH THE DATA"/> :
        <Nodatafound content="NO DATA ENTRIES FOUND" redirectPath="/createdata" />
        
      }
      
    </div>
  );
};

export default Datacontainer;
