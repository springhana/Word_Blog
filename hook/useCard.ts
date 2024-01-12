import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hook';

export const useCard = (_id: string | ObjectId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [card, setCard] = useState({});

  const state = useAppSelector(state => state.cardReducer.state);

  useEffect(() => {
    setCard({});
  }, [_id]);

  const { refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    queryKey: [`card-detail-${_id}`],
    queryFn: async () => {
      try {
        setLoading(true);
        setError(false);

        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios
          .get('/api/card', {
            params: { _id: _id },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              return res.data;
            }
          });
        if (response) {
          setCard(response);
          setLoading(false);
        }

        if (cancel) {
          cancel.cancel('Request canceled');
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
  }, [state]);

  return { loading, error, card };
};
