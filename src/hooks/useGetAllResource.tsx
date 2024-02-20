import { useEffect, useState } from "react";
import { useAppDispatch } from "../reduxstore/hooks/hooks";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const useGetAllResource = (
  getFunction: AsyncThunkAction<any, void, AsyncThunkConfig>
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFunction);
  }, []);
  return;
};
