import { configureStore } from '@reduxjs/toolkit';

import cardReducer from './features/cardSlice';
import commentReducer from './features/commentSlice';
import headerReducer from './features/headerSlice';
import idReducer from './features/idSlice';
import imageReducer from './features/imageSlice';
import likeReducer from './features/likeSlice';
import noteReducer from './features/noteSlice';
import pageReducer from './features/pageSlice';
import tagReducer from './features/tagSlice';
import writeReducer from './features/writeSlice';

export const store = configureStore({
  reducer: {
    tagReducer,
    idReducer,
    writeReducer,
    noteReducer,
    pageReducer,
    likeReducer,
    commentReducer,
    cardReducer,
    imageReducer,
    headerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
