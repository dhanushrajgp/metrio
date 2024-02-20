import axios, { Axios, AxiosError } from "axios";
import { BASEURL } from "../utils/helper";
import { useDispatch } from "react-redux";
import { error } from "console";

const axiosParams = {
  baseURL: BASEURL,
};

const axiosInstance = axios.create(axiosParams);


const api = (axios: Axios) => {
  return {
    get: (url: string, config = {}) =>
      axios.get(url, config).catch((error:AxiosError)=>{
        console.log(error)
      }),
    delete: (url: string, config = {}) =>
      axios.delete(url, config).catch((error:AxiosError)=>{
        console.log(error)
      }),
    post: (url: string, body: {}, config = {}) =>
      axios.post(url, body, config).catch((error:AxiosError)=>{
        console.log(error)
      }),
    put: (url: string, body: {}, config = {}) =>
      axios.put(url, body, config).catch((error:AxiosError)=>{
        console.log(error)
      })
      ,
  };
};

export default api(axiosInstance);
