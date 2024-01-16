import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const page = createSlice({
  name: 'page',
  initialState: { page: 1 },
  reducers: {
    page_change: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    page_init: state => {
      state.page = 1;
    },
  },
});

export const { page_change, page_init } = page.actions;
export default page.reducer;
