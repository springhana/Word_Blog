import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { memorize_change } from '@/redux/features/cardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
export default function MemoTab({
  setState,
}: {
  setState?: (state: string) => void;
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const memorize = useAppSelector(state => state.cardReducer.memorize);

  useEffect(() => {
    dispatch(memorize_change('all'));
  }, []);

  return (
    <>
      <div
        className={`tab ${memorize === 'all' ? 'tab_active' : ''}`}
        onClick={() => {
          dispatch(memorize_change('all'));
          if (pathname?.split('/')[1] === 'profile' && setState) setState('my');
        }}
      >
        all
      </div>
      <div
        className={`tab ${memorize === 'On' ? 'tab_active' : ''}`}
        onClick={() => {
          dispatch(memorize_change('On'));
        }}
      >
        on
      </div>
      <div
        className={`tab ${memorize === 'Off' ? 'tab_active' : ''}`}
        onClick={() => {
          dispatch(memorize_change('Off'));
        }}
      >
        off
      </div>
    </>
  );
}
