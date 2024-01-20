import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { useEffect } from 'react';

export default function useData(id: string) {
  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    gcTime: 1000 * 6000 * 24,
    staleTime: 1000 * 6000 * 24,
    queryKey: [`data-${id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/data', {
          params: { _id: id },
          cancelToken: source.token,
        });
        if (cancel) {
          cancel.cancel('Request canceled');
        }

        if (response.data) {
          return response.data;
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return { loading: isLoading, error: isError, data, hasMore: isFetched };
}
