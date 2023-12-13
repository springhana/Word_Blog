import { createSlice } from '@reduxjs/toolkit';

export const like = createSlice({
  name: 'like',
  initialState: { state: false },
  reducers: {
    change_state: state => {
      state.state = !state.state;
    },
  },
});

export const { change_state } = like.actions;
export default like.reducer;
