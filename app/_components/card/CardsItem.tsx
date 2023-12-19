'use client';

import { useCallback, useMemo, useRef } from 'react';

import { page_change } from '@/redux/features/pageSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardsType } from '@/types/global';
import { CardType } from '@/types/word_blog';

import MdItem from './markdown/MdItem';
import WordItem from './word/WordItem';

export default function CardsItem({
  cards,
  loading,
  hasMore,
  page,
  setPage,
  tag,
}: {
  cards: CardsType;
  loading: boolean;
  hasMore: boolean;
  page: number;
  setPage: (page: number) => void;
  tag: string;
}) {
  const dispatch = useAppDispatch();
  const memorize = useAppSelector(state => state.cardReducer.memorize);

  const observer: React.MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(page + 1);
            dispatch(page_change(page + 1));
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const memoizedCard = useMemo(() => {
    return cards.result.map((item: CardType, index: number) => {
      if (cards.result.length === index + 1 && page !== cards.totalPages) {
        if (item.program === 'markdown') {
          return (
            <div
              key={index}
              ref={lastElementRef}
              style={{ background: 'blue' }}
            >
              <MdItem item={item} memorize={memorize} />
            </div>
          );
        } else if (item.program === 'word') {
          return (
            <div
              key={index}
              ref={lastElementRef}
              style={{ background: 'blue' }}
            >
              <WordItem item={item} memorize={memorize} />
            </div>
          );
        }
      } else {
        if (item.program === 'markdown') {
          return (
            <div key={index}>
              <MdItem item={item} memorize={memorize} />
            </div>
          );
        } else if (item.program === 'word') {
          return (
            <div key={index}>
              <WordItem item={item} memorize={memorize} />
            </div>
          );
        }
      }
    });
  }, [cards.result, cards.totalPages, tag, page, memorize]);
  return <div>{memoizedCard}</div>;
}
