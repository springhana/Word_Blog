import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

export const useSearch = (value: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        if (value) {
          await axios
            .get('/api/search', {
              params: { value: value },
              cancelToken: source.token,
            })
            .then(res => {
              if (res.data) {
                setCards(res.data);
                setHasMore(res.data.length > 0);
              }
            });
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
  }, [value]);
  return { loading, error, cards, hasMore };
};
