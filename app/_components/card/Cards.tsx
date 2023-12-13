'use client';

import { useState } from 'react';

import { useCards } from '@/hook/useCards';
import { CardsType } from '@/types/global';

import MemoTab from '../MemoTab';
import CardsItem from './CardsItem';

export default function Cards({ tag }: { tag: string }) {
  const [page, setPage] = useState<number>(1);

  const pageEvent = () => {
    setPage(page + 1);
  };

  const { loading, error, cards, hasMore } = useCards(page, tag, 'tag') as {
    loading: boolean;
    error: boolean;
    cards: CardsType;
    hasMore: boolean;
  };

  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      {hasMore ? (
        <div>
          <MemoTab />
          <CardsItem
            cards={cards}
            loading={loading}
            hasMore={hasMore}
            page={page}
            pageEvent={pageEvent}
            tag={tag}
          />
        </div>
      ) : (
        '글이없어요'
      )}
    </div>
  );
}
