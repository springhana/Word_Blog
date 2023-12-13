import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectId } from 'mongodb';

interface StateType {
  Open: boolean;
  id: string;
  tag: string;
  editId: string | ObjectId;
}

const initialState: StateType = {
  Open: false,
  id: '',
  tag: '',
  editId: '',
};

export const write = createSlice({
  name: 'write',
  initialState,
  reducers: {
    onOpen: state => {
      state.Open = true;
    },
    onClose: state => {
      state.Open = false;
    },
    writeid_change: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    writetag_change: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
    writeEditID_change: (state, action: PayloadAction<string | ObjectId>) => {
      state.editId = action.payload;
    },
  },
});

export const {
  onOpen,
  onClose,
  writeid_change,
  writetag_change,
  writeEditID_change,
} = write.actions;
export default write.reducer;
