import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TagState {
  tag: { id: string; name: string };
  state: boolean;
}

const initialState: TagState = {
  tag: { id: 'all', name: 'all' },
  state: false,
};

export const tag = createSlice({
  name: 'tag',
  initialState,
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
