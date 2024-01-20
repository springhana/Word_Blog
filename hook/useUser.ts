import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { useState } from 'react';

import { UsersType } from '@/types/word_blog_user';

export const useUser = (_id: string, state: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<UsersType | string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading, isError, isFetched } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    enabled: !!_id,
    queryKey: [`user-${_id}`],
    queryFn: async () => {
      try {
        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios.get('/api/user', {
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
        console.error(error);
      }
    },
  });

  if (state === 'id') {
    return {
      loading: isLoading,
      error: isError,
      user: data,
      hasMore: isFetched,
    };
  } else if (state === 'email') {
    return { user: data };
  }
};
