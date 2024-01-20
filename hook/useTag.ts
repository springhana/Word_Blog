import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { useEffect } from 'react';

import { useAppSelector } from '@/redux/hook';

export const useTag = (id: string, state: string) => {
  const tag = useAppSelector(state => state.tagReducer.state);

  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    enabled: !!id,
    queryKey: [`tag-${id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/tag', {
          params: { id: id, state: state },
          cancelToken: source.token,
        });
        if (cancel) {
          cancel.cancel('Request canceled');
        }

        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch;
  }, [tag]);

  return { loading: isLoading, error: isError, tags: data, hasMore: isFetched };
};
