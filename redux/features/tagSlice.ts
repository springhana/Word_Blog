import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const tag = createSlice({
  name: 'tag',
  initialState: { tag: { id: 'all', name: 'all' }, state: false },
  reducers: {
    tag_change: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.tag = action.payload;
    },
    change_state: state => {
      state.state = !state.state;
    },
  },
});

export const { tag_change, change_state } = tag.actions;
export default tag.reducer;
