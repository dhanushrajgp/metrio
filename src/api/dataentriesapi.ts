import { BASEURL } from "../utils/helper";
import api from "./api";

const URLS = {
  fetchDataEntries: "data",
};

export const fetchAllDataEntriesAPI = () => {
  return api.get(URLS.fetchDataEntries, {
    baseUrl: BASEURL,
  });
};

export const fetchFormDataEntriesAPI = (formId: string | number) => {
  return api.get(`${URLS.fetchDataEntries}?formId=${formId}`, {
    baseUrl: BASEURL,
  });
};

export const fetchDataAPI = (id: string | number) => {
  return api.get(`${URLS.fetchDataEntries}/${id}`, {
    baseUrl: BASEURL,
  });
};

export const createDataAPI = (body: {}) => {
  return api.post(URLS.fetchDataEntries, body, {
    baseUrl: BASEURL,
  });
};


export const updateDataEntryAPI = (id:string|number ,body:{})=>{
    return api.put(`${URLS.fetchDataEntries}/${id}`,body,{
        baseUrl:BASEURL
    })
}

export const deleteDataEntryAPI = (id:string| number)=>{
    return api.delete(`${URLS.fetchDataEntries}/${id}`,{
        baseUrl:BASEURL
    })
};

