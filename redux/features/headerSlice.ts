import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const header = createSlice({
  name: 'header',
  initialState: { title: '' },
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = header.actions;
export default header.reducer;
