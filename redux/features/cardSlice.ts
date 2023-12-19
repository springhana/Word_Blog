import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectId } from 'mongodb';

interface StateType {
  Open: boolean;
  id: string | ObjectId;
  Open_delete: boolean;
  memorize: string;
  state: boolean;
  init: boolean;
}

const initialState: StateType = {
  Open: false,
  id: '',
  Open_delete: false,
  memorize: 'all',
  state: false,
  init: false,
};

export const card = createSlice({
  name: 'card',
  initialState,
  reducers: {
    onOpen: state => {
      state.Open = true;
    },
    onClose: state => {
      state.Open = false;
    },
    cardID_chage: (state, action: PayloadAction<string | ObjectId>) => {
      state.id = action.payload;
    },
    onOpen_delete: state => {
      state.Open_delete = true;
    },
    onClose_delete: state => {
      state.Open_delete = false;
    },
    memorize_change: (state, action: PayloadAction<string>) => {
      state.memorize = action.payload;
    },
    state_change: state => {
      state.state = !state.state;
    },
    Init: state => {
      state.init = !state.init;
    },
  },
});

export const {
  onOpen,
  onClose,
  cardID_chage,
  onOpen_delete,
  onClose_delete,
  memorize_change,
  state_change,
  Init,
} = card.actions;
export default card.reducer;
