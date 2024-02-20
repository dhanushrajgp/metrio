import { AxiosError } from "axios";
import { BASEURL } from "../utils/helper";
import api from "./api";

const URLS = {
  fetchForms: "forms",
};

export const fetchFormsAPI = async() => {
  return api.get(URLS.fetchForms, {
    baseUrl: BASEURL,
  })
};

export const fetchFormAPI = (id: string | number) => {
  return api.get(`${URLS.fetchForms}/${id}`, {
    baseUrl: BASEURL,
  });
};

export const createFormAPI = (body:{})=>{
    return api.post(URLS.fetchForms,body,{
        baseUrl:BASEURL
    })
}

export const updateFormAPI = (id:string|number ,body:{})=>{
    return api.put(`${URLS.fetchForms}/${id}`,body,{
        baseUrl:BASEURL
    })
}

export const deleteFormAPI = (id:string| number)=>{
    return api.delete(`${URLS.fetchForms}/${id}`,{
        baseUrl:BASEURL
    })
};


