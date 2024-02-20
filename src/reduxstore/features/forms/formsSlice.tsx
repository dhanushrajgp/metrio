import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { DataEntries, Form, FormTags } from "../../../types/forms";
import axios, { AxiosError } from "axios";
import { createFormAPI, deleteFormAPI, fetchFormAPI, fetchFormsAPI, updateFormAPI } from "../../../api/formsapi";
import { APISTATUS } from "../../../utils/helper";
import { createDataAPI, deleteDataEntryAPI, fetchAllDataEntriesAPI, fetchFormDataEntriesAPI } from "../../../api/dataentriesapi";
import { ifError } from "assert";

interface FormsState {
  forms: Form[];
  dataEntries: DataEntries[];
  data: DataEntries[];

  dataTags: {};
  form: object;
  formsLength: number;
  status: string;
  deleteStatus: string;
  error: string | undefined | null;
}
const initialState: FormsState = {
  forms: [],
  dataEntries: [],
  data: [],
  dataTags: {},
  deleteStatus: "idle",
  form: {},
  formsLength: 0,
  status: APISTATUS.IDLE,
  error: null,
};

export const fetchForms = createAsyncThunk("forms/fetchForms", async () => {
  const response = await fetchFormsAPI();
  return response?.data;
});

export const fetchAllData = createAsyncThunk("forms/fetchAllData", async () => {
  const response = await fetchAllDataEntriesAPI();
  return response?.data;
});

export const fetchDataEntries = createAsyncThunk(
  "forms/fetchDataEntries",
  async ({ formId }: { formId: string | number }) => {
    const response = await fetchFormDataEntriesAPI(formId)
    return response?.data;
  }
);

export const fetchForm = createAsyncThunk(
  "forms/fetchForm",
  async ({ id }: { id: string | number }) => {
    const response = await fetchFormAPI(id);
    if (!response) {
      initialState.status = APISTATUS.ERROR;
    }
    return response?.data;
  }
);

export const deleteDataEntry = createAsyncThunk(
  "forms/deleteDataEntry",
  async ({ id }: { id: string | number }) => {
    const response = await deleteDataEntryAPI(id);
    return response?.data;
  }
);
export const deleteForm = createAsyncThunk(
  "forms/deleteForm",
  async ({ id }: { id: string | number }) => {
    const response = await deleteFormAPI(id);
    return response?.data;
  }
);

export const addNewForm = createAsyncThunk(
  "forms/addNewForm",
  async (initialForm: {}) => {
    const response = await createFormAPI(initialForm)
    return response?.data;
  }
);

export const updateForm = createAsyncThunk(
  "forms/updateForm",
  async (initialForm: {
    id: string | number;
    name: string;
    tags: FormTags[];
  }) => {
    const response = await updateFormAPI(initialForm?.id,initialForm)
    return response?.data;
  }
);

export const addNewDataEntry = createAsyncThunk(
  "forms/addNewDataEntry",
  async (initialForm: {}) => {
    const response = await createDataAPI(initialForm)
    return response?.data;
  }
);

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    formAdded: (state, action: { payload: Form }) => {
      state.forms.push(action.payload);
    },
    formDeleted: (state, action: { payload: { id: string | number } }) => {
      state.forms = state.forms.filter(
        (item: Form) => item.id !== action.payload.id
      );
    },
    dataDeleted: (state, action: { payload: { id: string | number } }) => {
      state.dataEntries = state.dataEntries.filter(
        (item: DataEntries) => item.id !== action.payload.id
      );
      state.data = state.data.filter(
        (item: DataEntries) => item.id !== action.payload.id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForms.pending, (state, action) => {
        state.status = APISTATUS.PENDING;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.status = APISTATUS.ERROR;
        state.error = action.error.message;
      }) 
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.status = APISTATUS.SUCCESS;
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.forms = action.payload;
      })
      .addCase(fetchAllData.pending, (state, action) => {
        state.status = APISTATUS.PENDING;
      })
     
      .addCase(fetchAllData.rejected, (state, action) => {
        state.status = APISTATUS.ERROR;
        state.error = action.error.message;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.status = APISTATUS.SUCCESS;
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.data = action.payload;
      })
      .addCase(addNewForm.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.forms.push(action.payload);
        state.formsLength = state.forms.length;
      })
      .addCase(addNewDataEntry.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.data.push(action.payload);
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.form = action.payload;
        localStorage.setItem("form", JSON.stringify(action.payload));
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.form = action.payload;
      })
      .addCase(fetchDataEntries.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.dataEntries = action.payload;
      })
      .addCase(deleteDataEntry.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.dataEntries = state.dataEntries.filter(
          (item: DataEntries) => item.id !== action.payload.id
        );
        state.data = state.data.filter(
          (item: DataEntries) => item.id !== action.payload.id
        );
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        if(AxiosError){
          state.status = APISTATUS.ERROR
        }
        state.forms = state.forms.filter(
          (item: Form) => item.id !== action.payload.id
        );
      });
  },
});

export const { formAdded, formDeleted, dataDeleted } = formsSlice.actions;

export const getForms = (state: RootState) => state.forms.forms;
export const getNetworkStatus = (state: RootState) => state.forms.status;
export const getFormsError = (state: RootState) => state.forms.error;
export const getForm = (state: RootState) => state.forms.form;
export const getDataEntries = (state: RootState) => state.forms.dataEntries;
export const getDataTags = (state: RootState) => state.forms.dataTags;
export const getAllData = (state: RootState) => state.forms.data;
export const getDeleteStatus = (state: RootState) => state.forms.deleteStatus;

export default formsSlice.reducer;
