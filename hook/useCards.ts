import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

import { Init } from '@/redux/features/cardSlice';
import { page_change } from '@/redux/features/pageSlice';
// import { writeid_change, writetag_change } from '@/redux/features/writeSlice';
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

  const init = useAppSelector(state => state.cardReducer.init);
  // const write = useAppSelector(state => state.writeReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      setCards({
        result: [],
        totalPages: 1,
        currentPage: 1,
      });
      dispatch(Init());
      dispatch(page_change(1));
    }
  }, [init]);

  const { refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    queryKey: [`cards-${tag}`],
    queryFn: async () => {
      try {
        setError(false);
        setLoading(true);

        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios
          .get('/api/cards', {
            params: { page: page, tag: tag, state: state, author: id },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              let result;
              if (init) {
                result = [
                  ...new Set([
                    ...cards.result,
                    ...res.data.result.map((item: CardType) => item),
                  ]),
                ];
              } else {
                result = res.data.result;
              }

              const card = {
                result: result,
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage,
              };

              return card;
            }

            if (cancel) {
              cancel.cancel('Request canceled');
            }
          });

        if (response) {
          setCards(response);
          setLoading(false);
        }

        return response;
      } catch (error) {
        setError(true);
        console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [page, tag]);

  // useEffect(() => {
  //   const source = axios.CancelToken.source();
  //   const cancel: CancelTokenSource = source;

  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get('/api/card', {
  //           params: { _id: write.id, tag: write.tag },
  //           cancelToken: source.token,
  //         })
  //         .then(res => {
  //           if (res.data) {
  //             const card = {
  //               result: [...new Set([res.data, ...cards.result])],
  //               totalPages: cards.totalPages,
  //               currentPage: cards.currentPage,
  //             };

  //             setCards(card);
  //           }
  //         });
  //     } catch (e) {
  //       if (axios.isCancel(e)) return;
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //       dispatch(writeid_change(''));
  //       dispatch(writetag_change(''));
  //     }
  //   };

  //   if (write.id) {
  //     setError(false);
  //     setLoading(true);
  //     fetchData();
  //   }

  //   return () => {
  //     if (cancel) {
  //       cancel.cancel('Request canceled');
  //     }
  //   };
  // }, [write.id]);

  return { loading, error, cards };
};
