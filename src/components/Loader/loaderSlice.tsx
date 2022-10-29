import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 0,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    incrementLoader: (state) => {
      state.loading++;
    },
    decrementLoader: (state) => {
      state.loading--;
    },
  },
});

export const loaderActions = loaderSlice.actions

export default {
  reducer: loaderSlice.reducer,
  name: loaderSlice.name
};

