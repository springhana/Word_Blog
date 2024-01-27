import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

  const queryClient = useQueryClient();

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

  const { mutate } = useMutation({
    mutationFn: async () => {
      return axios.post('/api/like', { id: _id, user: user });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`like-${_id}`] });
    },
  });

  // 홈으로 가면 pages가 계속 변해서 refech가 일어남 해결
  useEffect(() => {
    refetch();
  }, [pages]);

  return {
    loading: isLoading,
    error: isError,
    like: data,
    hasMore: isFetched,
    mutate,
  };
};
