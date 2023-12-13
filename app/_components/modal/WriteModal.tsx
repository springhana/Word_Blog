'use client';
import { init_note } from '@/redux/features/noteSlice';
import { onClose, writeEditID_change } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import WriteCard from '../write/WriteCard';

export default function WirteModal() {
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.writeReducer.Open);

  if (!Open) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid red',
          alignItems: 'center',
          background: 'black',
          opacity: 0.7,
        }}
        onClick={() => {
          dispatch(onClose());
          dispatch(init_note());
          dispatch(writeEditID_change(''));
        }}
      ></div>
      <WriteCard />
    </div>
  );
}
