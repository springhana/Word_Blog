import { useEffect } from 'react';

import { memorize_change } from '@/redux/features/cardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function MemoTab() {
  const dispatch = useAppDispatch();
  const memorize = useAppSelector(state => state.cardReducer.memorize);

  useEffect(() => {
    dispatch(memorize_change('all'));
  }, []);

  return (
    <>
      <div
        onClick={() => {
          dispatch(memorize_change('all'));
        }}
      >
        all
      </div>
      <div
        onClick={() => {
          dispatch(memorize_change('On'));
        }}
      >
        on
      </div>
      <div
        onClick={() => {
          dispatch(memorize_change('Off'));
        }}
      >
        off
      </div>
    </>
  );
}
