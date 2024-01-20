import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect } from 'react';

import { useAppSelector } from '@/redux/hook';

export const useNote = (_id: string | ObjectId, state: string) => {
  const noteState = useAppSelector(state => state.noteReducer.state);

  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    enabled: !!_id,
    queryKey: [`note-${_id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/note', {
          params: { _id: _id, state: state },
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
  }, [noteState]);

  return {
    loading: isLoading,
    error: isError,
    note: data,
    hasMore: isFetched,
  };
};
