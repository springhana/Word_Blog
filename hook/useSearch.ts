import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { useEffect } from 'react';

export const useSearch = (value: string) => {
  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    enabled: !!value,
    queryKey: [`search-${value}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const respone = await axios.get('/api/search', {
          params: { value: value },
          cancelToken: source.token,
        });
        if (cancel) {
          cancel.cancel('Request canceled');
        }

        if (respone.data) {
          return respone.data;
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  return {
    loading: isLoading,
    error: isError,
    cards: data,
    hasMore: isFetched,
  };
};
