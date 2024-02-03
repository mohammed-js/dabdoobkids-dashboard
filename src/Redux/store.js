import { createSlice, configureStore } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  // initialState: { value: "light" },
  initialState: "light",
  reducers: {
    switch(state, action) {
      // state.value = action.payload;
      return action.payload;
    },
  },
});
const store = configureStore({
  reducer: { mode: modeSlice.reducer },
});

export const modeActions = modeSlice.actions;
export default store;
