import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hook';
import { LikesType, LikeType } from '@/types/word_blog';

export const useLike = (
  _id: string | ObjectId,
  field: string,
  user?: string
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [like, setLike] = useState<LikesType | LikeType[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const pages = useAppSelector(state => state.pageReducer.page);
  const state = useAppSelector(state => state.likeReducer.state);

  useEffect(() => {
    setLike([]);
  }, [_id]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        await axios
          .get('/api/like', {
            params: { _id: _id, field: field, user: user },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              setLike(res.data);
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
  }, [pages, state]);
  return { loading, error, like, hasMore };
};
