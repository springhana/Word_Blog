import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NoteItme } from '@/types/word_blog';

interface StateType {
  Open: boolean;
  state: boolean;
  select: NoteItme[];
}

const initialState: StateType = {
  Open: false,
  state: false,
  select: [],
};

export const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    onOpen: state => {
      state.Open = true;
    },
    onClose: state => {
      state.Open = false;
    },
    change_state: state => {
      state.state = !state.state;
    },
    select_note: (state: StateType, action: PayloadAction<NoteItme>) => {
      state.select = [
        ...state.select,
        { name: action.payload.name, id: action.payload.id },
      ];
    },
    delete_note: (state: StateType, action: PayloadAction<NoteItme>) => {
      state.select = state.select.filter(
        item =>
          !(item.name === action.payload.name && item.id === action.payload.id)
      );
    },
    init_note: state => {
      state.select = [];
    },
  },
});

export const {
  onOpen,
  onClose,
  change_state,
  select_note,
  init_note,
  delete_note,
} = note.actions;
export default note.reducer;
