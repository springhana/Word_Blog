import { createSlice } from '@reduxjs/toolkit';

export const image = createSlice({
  name: 'image',
  initialState: { Open: false },
  reducers: {
    onOpen: state => {
      state.Open = true;
    },
    onClose: state => {
      state.Open = false;
    },
  },
});

export const { onOpen, onClose } = image.actions;
export default image.reducer;
