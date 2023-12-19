import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const page = createSlice({
  name: 'page',
  initialState: { page: 1 },
  reducers: {
    page_change: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { page_change } = page.actions;
export default page.reducer;
