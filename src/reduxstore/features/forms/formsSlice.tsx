import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Form } from "../../../types/forms";
import axios from "axios";

interface FormsState {
  forms: Form[];
  formsLength:number;
  status: string;
  error: string | undefined | null;
}

const initialState: FormsState = {
  forms: [],
  formsLength:0,
  status: "idle",
  error: null,
};

export const fetchForms = createAsyncThunk("forms/fetchForms", async () => {
  const response = await axios.get("http://localhost:3001/forms");
  return response.data;
});
export const addNewForm =createAsyncThunk(
  "forms/addNewForm",
  async (initialForm:{}) => {
    const response = await axios.post(
      "http://localhost:3001/forms",
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
      .addCase(addNewForm.fulfilled, (state, action) => {
        state.forms.push(action.payload);
        state.formsLength = state.forms.length;
      });
  },
});

export const { formAdded } = formsSlice.actions;

export const getForms = (state: RootState) => state.forms.forms;
export const getFormsStatus = (state: RootState) => state.forms.status;
export const getFormsError = (state: RootState) => state.forms.error;
export const getFormsLength = (state: RootState) => state.forms.formsLength;

export default formsSlice.reducer;
