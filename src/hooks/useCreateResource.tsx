import axios, { Axios, AxiosPromise, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { APISTATUS } from "../utils/helper";

export const useCreateResource = () => {
  const [data, setData] = useState(null);
  const [requestStatus, setRequestStatus] = useState(APISTATUS.IDLE);

  const initCreateData = async (
    getData: Promise<void | AxiosResponse<any, any>>
  ) => {
    setRequestStatus(APISTATUS.PENDING);
    const response = await getData;
    if (!response) {
      setRequestStatus(APISTATUS.ERROR);
    }
    if (response) {
      setData(response.data);
      setRequestStatus(APISTATUS.SUCCESS);
    }
  };
  return { data, initCreateData };
};
