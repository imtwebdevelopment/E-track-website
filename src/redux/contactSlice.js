import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: { submissions: [] },
  reducers: {
    addSubmission: (state, action) => {
      state.submissions.push({
        ...action.payload,
        timestamp: new Date().toLocaleString(),
      });
    },
  },
});

export const { addSubmission } = contactSlice.actions;
export default contactSlice.reducer;
