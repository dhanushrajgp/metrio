import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice";
import formsReducer from "./features/forms/formsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    forms: formsReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch