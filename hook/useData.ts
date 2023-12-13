import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

export default function useData(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ card: 0, comment: 0, like: 0, note: 0 });
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;
    const fetchData = async () => {
      try {
        await axios
          .get('/api/data', {
            params: { _id: id },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              console.log(res.data);
              setData(res.data);
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
  return { loading, error, data, hasMore };
}
