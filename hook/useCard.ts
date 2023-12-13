import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

export const useCard = (_id: string | ObjectId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [card, setCard] = useState({});

  useEffect(() => {
    setCard([]);
  }, [_id]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        await axios
          .get('/api/card', {
            params: { _id: _id },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              setCard(res.data);
              setLoading(false);
            }
          });
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      }
    };

    fetchData();
    return () => {
      if (cancel) {
        cancel.cancel('Request canceled');
      }
    };
  }, [_id]);
  return { loading, error, card };
};
