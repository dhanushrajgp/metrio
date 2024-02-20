import React from "react";
import { useAppSelector } from "../../../reduxstore/hooks/hooks";
import { getDataEntries } from "../../../reduxstore/features/forms/formsSlice";
import { DataEntries } from "../../../types/forms";
import "./Dataentriesview.css";
import Datacard from "../datacard/Datacard";
import Nodatafound from "../../common/nodatafound/Nodatafound";
import { useResource } from "../../../hooks/useResource";
import { fetchFormDataEntriesAPI } from "../../../api/dataentriesapi";

const Dataentriesview = () => {

  const formId = JSON.parse(localStorage?.getItem("formId") as string);
  const {data} = useResource(fetchFormDataEntriesAPI(formId?.id)) as unknown as {data:DataEntries[]};
  return (
    <>
      {data?.length > 0 ? (
        <div className="DataEntriesView">
          <div className="Datafilter">DataFilter</div>
          <div className="Datacardcontainer">
            {data?.map((item:DataEntries, index:number) => {
              return (
                <Datacard
                  date={item?.date}
                  note={item?.note}
                  tags={item?.tags}
                  value={item?.value}
                  id={item?.id}
                  key={item?.id}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Nodatafound content="NO DATA ENTRIES FOUND FOR THE SCHEMA" redirectPath="createdata"  />
      )}
    </>
  );
};

export default Dataentriesview;
