import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect } from 'react';

import { useAppSelector } from '@/redux/hook';

export const useCard = (_id: string | ObjectId) => {
  const state = useAppSelector(state => state.cardReducer.state);

  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    enabled: !!_id,
    queryKey: [`card-detail-${_id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/card', {
          params: { _id: _id },
          cancelToken: source.token,
        });
        if (cancel) {
          cancel.cancel('Request canceled');
        }

        if (response.data) {
          return response.data;
        }
        return response;
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [state]);

  return { loading: isLoading, error: isError, card: data, hasMore: isFetched };
};
