import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const id = createSlice({
  name: 'id',
  initialState: { id: '' },
  reducers: {
    id_chage: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { id_chage } = id.actions;
export default id.reducer;
