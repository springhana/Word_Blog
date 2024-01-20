import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect } from 'react';

import { useAppSelector } from '@/redux/hook';

export const useLike = (
  _id: string | ObjectId,
  field: string,
  user?: string
) => {
  const pages = useAppSelector(state => state.pageReducer.page);

  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    enabled: !!_id,
    queryKey: [`like-${_id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/like', {
          params: { _id: _id, field: field, user: user },
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
  }, [pages]);

  return { loading: isLoading, error: isError, like: data, hasMore: isFetched };
};
