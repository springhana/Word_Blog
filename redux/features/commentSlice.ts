import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const comment = createSlice({
  name: 'comment',
  initialState: { state: false, id: '', editID: '' },
  reducers: {
    change_state: state => {
      state.state = !state.state;
    },
    commentID_change: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    editID_change: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { change_state, commentID_change, editID_change } =
  comment.actions;
export default comment.reducer;
