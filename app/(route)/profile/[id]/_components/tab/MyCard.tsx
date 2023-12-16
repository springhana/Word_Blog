import { useState } from 'react';

import CardsItem from '@/app/_components/card/CardsItem';
import MemoTab from '@/app/_components/MemoTab';
import { useCards } from '@/hook/useCards';
import { memorize_change } from '@/redux/features/cardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardsType } from '@/types/global';

import Chart from '../Chart';
import LikeCards from './LikeCards';

export default function MyCard({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const memorize = useAppSelector(state => state.cardReducer.memorize);

  const [page, setPage] = useState(1);
  const [state, setState] = useState('my');

  const pageEvent = () => {
    setPage(page + 1);
  };

  const { loading, error, cards, hasMore } = useCards(
    page,
    'all',
    'my',
    id
  ) as {
    loading: boolean;
    error: boolean;
    cards: CardsType;
    hasMore: boolean;
  };

  return (
    <div>
      {loading ? '로딩' : null}
      {error ? '에러' : null}

      {hasMore && <Chart cards={cards} />}

      <div className="memoTab">
        <MemoTab setState={setState} />
        <div
          onClick={() => {
            if (memorize !== 'all') {
              dispatch(memorize_change('all'));
            }
            setState('like');
          }}
          className={`tab ${state === 'like' ? 'tab_active' : ''}`}
        >
          좋아한 카드
        </div>
        <div
          onClick={() => {
            if (memorize !== 'all') {
              dispatch(memorize_change('all'));
            }
            setState('comment');
          }}
          className={`tab ${state === 'comment' ? 'tab_active' : ''}`}
        >
          댓글단 카드
        </div>
      </div>

      {hasMore && state === 'my' ? (
        <CardsItem
          cards={cards}
          loading={loading}
          hasMore={hasMore}
          page={page}
          pageEvent={pageEvent}
          tag={'all'}
        />
      ) : (
        <LikeCards id={id} />
      )}
    </div>
  );
}
