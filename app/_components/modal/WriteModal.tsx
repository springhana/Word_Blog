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
    <div className="modal">
      <div
        className="modal_background"
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
