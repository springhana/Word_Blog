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
  page,
  loading,
  error,
  tag,
}: {
  cards: CardsType;
  page: number;
  loading: boolean;
  error: boolean;
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
          if (entries[0].isIntersecting && !error) {
            dispatch(page_change(page + 1));
          }
        },
        { threshold: 0.7 }
      );
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const memoizedCard = useMemo(() => {
    return cards.result.map((item: CardType, index: number) => {
      if (cards.result.length === index + 1 && page !== cards.totalPages) {
        if (item.program === 'markdown') {
          return (
            <div key={item._id as string} ref={lastElementRef}>
              <MdItem item={item} memorize={memorize} />
            </div>
          );
        } else if (item.program === 'word') {
          return (
            <div key={item._id as string} ref={lastElementRef}>
              <WordItem item={item} memorize={memorize} />
            </div>
          );
        }
      } else {
        if (item.program === 'markdown') {
          return (
            <div key={item._id as string}>
              <MdItem item={item} memorize={memorize} />
            </div>
          );
        } else if (item.program === 'word') {
          return (
            <div key={item._id as string}>
              <WordItem item={item} memorize={memorize} />
            </div>
          );
        }
      }
    });
  }, [cards.result, cards.totalPages, tag, page, memorize]);

  return <div>{memoizedCard}</div>;
}
