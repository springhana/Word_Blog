import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const write = createSlice({
  name: 'write',
  initialState: { id: '', tag: '' },
  reducers: {
    writeid_change: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    writetag_change: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
  },
});

export const { writeid_change, writetag_change } = write.actions;
export default write.reducer;
