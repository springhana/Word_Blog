import { UsersType } from '@/types/word_blog_user';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

export const useUser = (_id: string, state: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<UsersType | string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user', {
          params: { _id: _id, state: state },
          cancelToken: source.token,
        });
        if (response.data) {
          setUser(response.data);
          setHasMore(response.data);
        }
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      if (cancel) {
        cancel.cancel('Request canceled');
      }
    };
  }, [_id]);
  if (state === 'id') {
    return { loading, error, user, hasMore };
  } else if (state === 'email') {
    return { user };
  }
};
