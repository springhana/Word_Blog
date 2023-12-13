'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { change_state, onClose } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function NoteModal() {
  const [noteName, setNoteName] = useState('');

  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.noteReducer.Open);
  const id = useAppSelector(state => state.idReducer.id);

  useEffect(() => {
    dispatch(onClose());
  }, []);

  const PostNote = async () => {
    await axios.post('/api/note', { id: id, name: noteName }).then(res => {
      if (res.data.post) {
        dispatch(onClose());
        dispatch(change_state());
      }
    });
  };

  if (!Open) {
    return null;
  }

  return (
    <div style={{ border: '1px solid red' }}>
      <div
        onClick={() => {
          dispatch(onClose());
        }}
      >
        취소
      </div>
      <p>단어장 추가</p>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNoteName(e.target.value);
        }}
      />
      <button onClick={PostNote}>추가</button>
    </div>
  );
}
