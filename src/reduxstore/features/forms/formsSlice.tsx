import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { DataEntries, Form, FormTags } from "../../../types/forms";
import axios from "axios";

interface FormsState {
  forms: Form[];
  dataEntries:DataEntries[];
  data:DataEntries[];
  dataTags:{};
  form:object;
  formsLength: number;
  status: string;
  deleteStatus:string;
  error: string | undefined | null;
}

const initialState: FormsState = {
  forms: [],
  dataEntries:[],
  data:[],
  dataTags:{},
  deleteStatus:"idle",
  form:{},
  formsLength: 0,
  status: "idle",
  error: null,
};

export const fetchForms = createAsyncThunk("forms/fetchForms", async () => {
  const response = await axios.get("http://localhost:3001/forms");
  return response.data;
});

export const fetchAllData = createAsyncThunk("forms/fetchAllData", async () => {
  const response = await axios.get("http://localhost:3001/data");
  return response.data;
});

export const fetchDataEntries = createAsyncThunk("forms/fetchDataEntries", async ({formId}:{formId:string|number}) => {
  const response = await axios.get(`http://localhost:3001/data?formId=${formId}`);
  return response.data;
});

export const fetchForm = createAsyncThunk("forms/fetchForm", async ({id}:{id:string | number}) => {
    const response = await axios.get(`http://localhost:3001/forms/${id}`);
    return response.data;
  });

export const deleteDataEntry = createAsyncThunk("forms/deleteDataEntry",async({id}:{id:string | number})=>{
  const response = await axios.delete(`http://localhost:3001/data/${id}`);
    return response.data;
})
export const deleteForm = createAsyncThunk("forms/deleteForm",async({id}:{id:string | number})=>{
  const response = await axios.delete(`http://localhost:3001/forms/${id}`);
    return response.data;
})


export const addNewForm = createAsyncThunk(
  "forms/addNewForm",
  async (initialForm: {}) => {
    const response = await axios.post(
      "http://localhost:3001/forms",
      initialForm
    );
    return response.data;
  }
);
export const updateForm = createAsyncThunk(
  "forms/updateForm",
  async (initialForm: {id:string | number,name:string,tags:FormTags[]}) => {
    const response = await axios.put(
      `http://localhost:3001/forms/${initialForm?.id}`,
      initialForm
    );
    return response.data;
  }
);

export const addNewDataEntry = createAsyncThunk(
  "forms/addNewDataEntry",
  async (initialForm: {}) => {
    const response = await axios.post(
      "http://localhost:3001/data",
      initialForm
    );
    return response.data;
  }
);


export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    formAdded: (state, action: { payload: Form }) => {
      state.forms.push(action.payload);
    },
    tagsAdded:(state,action:{payload:string})=>{
      
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForms.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forms = action.payload;
        state.formsLength = action.payload.length;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewForm.fulfilled, (state, action) => {
        state.forms.push(action.payload);
        state.formsLength = state.forms.length;
      })
      .addCase(addNewDataEntry.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        state.form = action.payload;
        localStorage.setItem("form",JSON.stringify(action.payload));
      })
      .addCase(updateForm.fulfilled,(state,action)=>{
        state.form = action.payload;
      })
      .addCase(fetchDataEntries.fulfilled,(state,action)=>{
        state.dataEntries = action.payload;
      })
      .addCase(deleteDataEntry.fulfilled,(state,action)=>{
        state.dataEntries = state.dataEntries.filter((item:DataEntries)=>item.id !== action.payload.id);
        state.data = state.data.filter((item:DataEntries)=>item.id !== action.payload.id);
      })
      .addCase(deleteForm.fulfilled,(state,action)=>{
        state.forms = state.forms.filter((item:Form)=>item.id !== action.payload.id);
      })
  },
});

export const { formAdded,tagsAdded } = formsSlice.actions;

export const getForms = (state: RootState) => state.forms.forms;
export const getFormsStatus = (state: RootState) => state.forms.status;
export const getFormsError = (state: RootState) => state.forms.error;
export const getFormsLength = (state: RootState) => state.forms.formsLength;
export const getForm = (state: RootState) => state.forms.form;
export const getDataEntries = (state:RootState)=> state.forms.dataEntries;
export const getDataTags = (state:RootState)=> state.forms.dataTags;
export const getAllData = (state:RootState)=>state.forms.data;
export const getDeleteStatus = (state:RootState)=> state.forms.deleteStatus;

export default formsSlice.reducer;
