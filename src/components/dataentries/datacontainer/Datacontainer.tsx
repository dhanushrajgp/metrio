import React, { useContext, useEffect, useState } from "react";

import "./Datacontainer.css";
import { DataEntries, Form } from "../../../types/forms";
import { useAppDispatch, useAppSelector } from "../../../reduxstore/hooks/hooks";
import Datacard from "../datacard/Datacard";
import Nodatafound from "../../common/nodatafound/Nodatafound";
import { useResource } from "../../../hooks/useResource";
import { fetchAllDataEntriesAPI } from "../../../api/dataentriesapi";
import SkeletonLoader from "../../common/loader/SkeletonLoader";
import ErrorHandler from "../../common/errorhandler/Errorhandler";
import { fetchAllData, getAllData, getDataEntries, getNetworkStatus } from "../../../reduxstore/features/forms/formsSlice";
import { useGetAllResource } from "../../../hooks/useGetAllResource";

const Datacontainer = () => {
  useGetAllResource(fetchAllData())
  const dataStatus = useAppSelector(getNetworkStatus);
  const data = useAppSelector(getAllData);
  return (
    <div className="Datacontainer">
        <div className="FormTitle">DATA ENTRIES</div>
      {data?.length > 0 ? (
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
      ) : (
        <ErrorHandler
          content="NO DATA ENTRIES FOUND"
          redirectPath="createdata"
          requestStatus={dataStatus}
        />
      )}
    </div>
  );
};

export default Datacontainer;
