import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

export const useSubscribe = (id: string, state: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [subscribe, setSubscribe] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        await axios
          .get('/api/subscribe', {
            params: { author: id, state: state },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              setSubscribe(res.data);
              setHasMore(res.data);
            }
          });
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
  }, [id]);

  return { loading, error, subscribe, hasMore };
};
