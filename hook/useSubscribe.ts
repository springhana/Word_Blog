import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';

export const useSubscribe = (id: string, state: string) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    queryKey: [`subscribe-${id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/subscribe', {
          params: { author: id, state: state },
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

  return {
    loading: isLoading,
    error: isError,
    subscribe: data,
    hasMore: isFetched,
  };
};
