import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

import { writeid_change, writetag_change } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardsType } from '@/types/global';
import { CardType } from '@/types/word_blog';

export const useCards = (
  page: number,
  tag: string,
  state: string,
  id?: string | ObjectId
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState<CardsType>({
    result: [],
    totalPages: 1,
    currentPage: 1,
  });
  const [hasMore, setHasMore] = useState(false);
  const write = useAppSelector(state => state.writeReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCards({
      result: [],
      totalPages: 1,
      currentPage: 1,
    });
  }, [tag]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        await axios
          .get('/api/card', {
            params: { _id: write.id, tag: write.tag },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              const card = {
                result: [...new Set([res.data, ...cards.result])],
                totalPages: cards.totalPages,
                currentPage: cards.currentPage,
              };

              setCards(card);
              setHasMore(res.data);
            }
          });
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      } finally {
        setLoading(false);
        dispatch(writeid_change(''));
        dispatch(writetag_change(''));
      }
    };

    if (write.id) {
      setError(false);
      setLoading(true);
      fetchData();
    }

    return () => {
      if (cancel) {
        cancel.cancel('Request canceled');
      }
    };
  }, [write]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;
    const fetchData = async () => {
      try {
        await axios
          .get('/api/cards', {
            params: { page: page, tag: tag, state: state, author: id },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              const card = {
                result: [
                  ...new Set([
                    ...cards.result,
                    ...res.data.result.map((item: CardType) => item),
                  ]),
                ],
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage,
              };
              setCards(card);
              setHasMore(res.data.result.length > 0);
            }
          });
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      if (cancel) {
        cancel.cancel('Request canceled');
      }
    };
  }, [page, tag]);
  return { loading, error, cards, hasMore };
};
