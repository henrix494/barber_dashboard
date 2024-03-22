import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: any;
}

const initialState: CounterState = {
  value: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    push: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { push } = counterSlice.actions;

export default counterSlice.reducer;
