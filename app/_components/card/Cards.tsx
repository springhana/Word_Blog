'use client';

import { useEffect, useState } from 'react';

import { useCards } from '@/hook/useCards';
import { useAppSelector } from '@/redux/hook';
import { CardsType } from '@/types/global';

import CardsItem from './CardsItem';

export default function Cards({ tag }: { tag: string }) {
  const [page, setPage] = useState<number>(1);
  const pages = useAppSelector(state => state.pageReducer.page);

  useEffect(() => {
    setPage(pages);
  }, [pages]);

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
          <CardsItem
            cards={cards}
            loading={loading}
            hasMore={hasMore}
            page={page}
            setPage={setPage}
            tag={tag}
          />
        </div>
      ) : (
        '글이없어요'
      )}
    </div>
  );
}
