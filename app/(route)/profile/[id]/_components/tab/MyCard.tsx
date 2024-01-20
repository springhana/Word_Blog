import { useEffect, useState } from 'react';

import CardsItem from '@/app/_components/card/CardsItem';
import MemoTab from '@/app/_components/MemoTab';
import { useCards } from '@/hook/useCards';
import { memorize_change } from '@/redux/features/cardSlice';
import { page_init } from '@/redux/features/pageSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardsType } from '@/types/global';

import Chart from '../Chart';
import LikeCards from './LikeCards';

export default function MyCard({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const memorize = useAppSelector(state => state.cardReducer.memorize);

  const [state, setState] = useState('my');

  const pages = useAppSelector(state => state.pageReducer.page);
  const tag = useAppSelector(state => state.tagReducer.tag.id);

  useEffect(() => {
    dispatch(page_init());
  }, []);

  const { loading, error, cards } = useCards(pages, tag, 'my', id) as {
    loading: boolean;
    error: boolean;
    cards: CardsType;
  };

  return (
    <div>
      {!loading && !error && <Chart cards={cards} />}

      <div className="memoTab">
        <MemoTab setState={setState} />
        <div
          onClick={() => {
            if (memorize !== 'all') {
              dispatch(memorize_change('all'));
            }

            if (state === 'my') {
              setState('like');
            } else {
              setState('my');
            }
          }}
          className={`tab ${state === 'like' ? 'tab_active' : ''}`}
        >
          좋아한 카드
        </div>
        {/* <div
          onClick={() => {
            if (memorize !== 'all') {
              dispatch(memorize_change('all'));
            }
            setState('comment');
          }}
          className={`tab ${state === 'comment' ? 'tab_active' : ''}`}
        >
          댓글단 카드
        </div> */}
      </div>

      {state === 'my' ? (
        <CardsItem
          cards={cards}
          loading={loading}
          error={error}
          page={pages}
          tag={'all'}
        />
      ) : (
        <LikeCards id={id} />
      )}
    </div>
  );
}
