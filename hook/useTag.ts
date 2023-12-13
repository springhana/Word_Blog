import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hook';
import { TagType } from '@/types/word_blog';

export const useTag = (id: string, state: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState<TagType[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const tag = useAppSelector(state => state.tagReducer.state);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetcgData = async () => {
      try {
        await axios
          .get('/api/tag', {
            params: { id: id, state: state },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              setTags(res.data);
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
    fetcgData();

    return () => {
      if (cancel) {
        cancel.cancel('Request canceled');
      }
    };
  }, [id, tag]);
  return { loading, error, tags, hasMore };
};
