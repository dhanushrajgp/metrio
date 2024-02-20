import { AxiosResponse } from "axios";
import { useState } from "react";
import { APISTATUS } from "../utils/helper";

export const useUpdateResource = () => {
  const [data, setData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(APISTATUS.IDLE);
  const updateData = async ( getData: Promise<void | AxiosResponse<any, any>>) => {
    setRequestStatus(APISTATUS.PENDING);
    const response = await getData;
    if(!response){
      setRequestStatus(APISTATUS.ERROR);
    }
    if(response){
      setData(response.data);
      setRequestStatus(APISTATUS.SUCCESS);
    }
  };
  return { data, updateData,requestStatus };
};
