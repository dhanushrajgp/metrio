import axios, { Axios, AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { APISTATUS } from "../utils/helper";

export const useResource = (
  getData: Promise<void | AxiosResponse<any, any>>
) => {
  const [requestStatus, setRequestStatus] = useState(APISTATUS.IDLE);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (requestStatus == APISTATUS.IDLE) {
      setRequestStatus(APISTATUS.PENDING);
      const handlerequest = async () => {
        const response = await getData;
        if (!response) {
          setRequestStatus(APISTATUS.ERROR);
        }
        if (response) {
          setData(response.data);
          setRequestStatus(APISTATUS.SUCCESS);
        }
      };
      handlerequest();
    }
  }, []);

  return { requestStatus, data,setRequestStatus };
};
